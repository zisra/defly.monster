const fs = require('fs');
const util = require('util');
const path = require('path');

const Sentry = require('@sentry/node');
const Discord = require('discord.js');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const session = require('express-session');

const config = require('./config.js');
const router = require('./router.js');
const generateArticles = require('./articles.js');

generateArticles();

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.escapeMarkdown = function () {
	return Discord.escapeMarkdown(this);
};

const { GatewayIntentBits, Partials, AttachmentBuilder, EmbedBuilder } =
	Discord;

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: 'production',
});

const app = express();

const client = new Discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
	allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
	partials: [Partials.Channel],
});

Sentry.configureScope((scope) => {
	scope.setExtra('discord.js connection', client.isReady());
});

client.on('ready', async (client) => {
	client.user.setActivity('defly.io');
	console.log('Bot working');
	Sentry.configureScope((scope) => {
		scope.setExtra('discord.js connection', true);
	});
});

client.on('rateLimit', (rateLimit) => {
	Sentry.captureEvent({ message: 'Ratelimit', rateLimit });
});

client.on('shardDisconnect', (event, id) => {
	Sentry.captureEvent({ message: 'Shard disconnect', event, id });
	Sentry.configureScope((scope) => {
		scope.setExtra('discord.js connection', client.isReady());
	});
});

client.on('shardError', (error, id) => {
	Sentry.captureEvent({ message: 'shard error', event, id });
	Sentry.configureScope((scope) => {
		scope.setExtra('discord.js connection', client.isReady());
	});
});

client.on('shardResume', (id) => {
	Sentry.captureEvent({ message: 'Shard resume', id });
	Sentry.configureScope((scope) => {
		scope.setExtra('discord.js connection', client.isReady());
	});
});

client.on('warn', (warning) => {
	Sentry.captureEvent({ message: 'Warning', warning });
});

client.on('messageCreate', async (message) => {
	if (!message.content.startsWith(config.PREFIX)) return;
	const args = message.content.slice(config.PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	const commandFolder = fs.readdirSync('./src/commands');
	if (commandFolder.find((i) => i === `${command}.js`)) {
		const selectedCommand = require(`./commands/${command}.js`);
		try {
			if (selectedCommand?.adminOnly) {
				if (process.env.BOT_OWNER === message.author.id) {
					selectedCommand.command(message, args, client);
				} else {
					message.react('\u274C');
				}
			} else {
				selectedCommand.command(message, args, client);
			}
		} catch (err) {
			Sentry.captureException(err);
			await message.react('\u274C');
			await message.reply(
				'Something went wrong with this command. Please try again soon. '
			);
		}
	} else if (command === 'eval' && message.author.id == process.env.BOT_OWNER) {
		try {
			const code = args.join(' ');
			let evaled = eval(code);
			if (typeof evaled !== 'string') {
				evaled = util.inspect(evaled);
			}
			const evalEmbed = new EmbedBuilder()
				.setTitle('Eval')
				.setDescription(
					`**Input:**\`\`\`js\n${code}\`\`\`\n**Output:**\`\`\`xl\n${evaled}\`\`\``
				)
				.setColor(config.EMBED.SUCCESS);
			message.channel.send({ embeds: [evalEmbed] });
		} catch (err) {
			console.error(err);
			message.react('858457517965180988');
			const code = args.join(' ');
			const errEmbed = new EmbedBuilder()
				.setTitle('Error')
				.setDescription(
					`**Input:**\`\`\`js\n${code}\`\`\`\n**Output:**\`\`\`xl\n${err}\`\`\``
				)
				.setColor(config.EMBED.ERROR);
			message.channel.send({ embeds: [errEmbed] });
		}
	} else {
		return;
	}
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

	try {
		if (interaction.customId === 'getimages') {
			const skinId = interaction.message.content.replace(
				'Defly.io skin ID: ',
				''
			);
			const skinFile = JSON.parse(
				fs.readFileSync(`./src/skins/skin${skinId}.txt`, 'utf8')
			);

			const skin = Object.keys(skinFile.images).map((key) => {
				return {
					file: skinFile.images[key].split(',')[1],
					name: key,
				};
			});
			await interaction.reply({
				ephemeral: true,
				files: skin.map(
					(i) =>
						new AttachmentBuilder(Buffer.from(i.file, 'base64'), {
							name: `${i.name}.png`,
						})
				),
			});
		}
	} catch (err) {
		Sentry.captureException(err);
	}
});

client.login(process.env.DISCORD_TOKEN);

app.use(
	session({
		secret: process.env.CLIENT_SECRET,
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: true },
	})
);

app.use('/api/stats', (req, res, next) => {
	req.guildCount = client.guilds.cache.size;
	req.guilds = client.guilds.cache.map(guild=> ({
		available: guild.available, 
		memberCount: guild.memberCount,
		owner: guild.ownerId,
		icon: guild.icon,
		id: guild.id, 
		name: guild.name,
		joinedAt: guild.joinedAt, 
		createdAt: guild.createdAt,
	}))
	req.uptime = client.uptime;
	req.isReady = client.isReady();
	
	next();
}, router)

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(
	'/articles',
	express.static(__dirname + '/publicArticles', { extensions: ['html'] })
);
app.use('/api', router);

app.get('/auth', async (req, res) => {
	const code = req.query.code;

	if (code) {
		try {
			const parameters = new URLSearchParams();
			parameters.append('client_id', process.env.APP_ID);
			parameters.append('client_secret', process.env.CLIENT_SECRET);
			parameters.append('grant_type', 'authorization_code');
			parameters.append('code', code);
			parameters.append('redirect_uri', 'http://defly.monster/auth/');
			parameters.append('scope', 'identify');

			const authData = await axios.post(
				'https://discord.com/api/oauth2/token',
				parameters,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);
			const auth = authData.data;

			const userData = await axios.get('https://discord.com/api/users/@me', {
				headers: {
					Authorization: `Bearer ${auth.access_token}`,
				}
			})
			const user = userData.data;

			const isAdmin = process.env.ADMINS.split(',').find(usr=> usr === user.id) ? true : false;

			req.session.accessToken = auth.access_token;
			req.session.refreshToken = auth.refresh_token;
			req.session.userId = user.id;
			req.session.username = user.username;
			req.session.isAdmin = isAdmin;

			res.redirect('/dashboard');
		} catch (err) {
			Sentry.captureException(err);
			console.error(err);
		}
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/dashboard');
});

app.get('/session', (req, res) => {
	const {accessToken, refreshToken, userId, username, isAdmin } = req.session;
	res.json({accessToken, refreshToken, userId, username, isAdmin })
})

app.get('*', (req, res) => {
	res.status(404);
	res.sendFile('./public/404.html', {
		root: __dirname,
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server working');
});