// https://discord.com/api/oauth2/authorize?client_id=883125551139799070&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2F&response_type=code&scope=identify

import fs from 'node:fs';

import util from 'node:util';
import path from 'node:path';
import Sentry from '@sentry/node';
import Discord from 'discord.js';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import session from 'express-session';
import memoryStore from 'memorystore';
import config from './config.js';
import router from './router.js';
import generateArticles from './articles.js';
import dotenv from 'dotenv';

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
	dotenv.config();
}

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: process.env.NODE_ENV,
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
	client.application.commands.fetch();
});

client.on('rateLimit', (rateLimit) => {
	Sentry.captureEvent({ message: 'Ratelimit', rateLimit });
});

client.on('shardError', (error, id) => {
	Sentry.captureEvent({ message: 'shard error', event, id });
	Sentry.configureScope((scope) => {
		scope.setExtra('discord.js connection', client.isReady());
	});
});

client.on('warn', (warning) => {
	Sentry.captureEvent({ message: 'Warning', warning });
});

client.on('messageCreate', async (message) => {
	if (message.channel.id == config.ELITE_CHANGES_CHANNEL && message.webhookId) {
		message.crosspost();
	}

	if (!message.content.startsWith(config.PREFIX)) return;
	const args = message.content.slice(config.PREFIX.length).trim().split(' ');

	const command = args.shift().toLowerCase();
	const commandFolder = fs.readdirSync('./src/commands');
	if (commandFolder.find((i) => i === `${command}.js`)) {
		const { default: selectedCommand } = await import(
			`./commands/${command}.js`
		);
		try {
			if (selectedCommand.guildOnly && !message.guild) return;
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
			console.error(err);
			Sentry.captureException(err);
			await message.react('\u274C');
			await message.reply(
				'Something went wrong with this command. Please try again soon. If you need a list of commands, run `d?help`'
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
	if (interaction.isChatInputCommand()) {
		const command = interaction.commandName;
		const commandFolder = fs.readdirSync('./src/commands');
		let args = {};
		interaction.options.data.forEach((arg) => {
			args[arg.name] = arg.value.toString();
		});

		if (commandFolder.find((i) => i === `${command}.js`)) {
			const { default: selectedCommand } = await import(
				`./commands/${command}.js`
			);
			try {
				interaction.interaction = true;
				if (selectedCommand.adminOnly) return;
				if (selectedCommand.seperateCommandTypes) {
					selectedCommand.interactionCommand(interaction, client);
				} else {
					selectedCommand.command(interaction, args, client);
				}
			} catch (err) {
				console.log(err);
				Sentry.captureException(err);
				await interaction.reply({
					content:
						'Something went wrong with this command. Please try again soon. If you need a list of commands, run </help:1053166812231123051>.',
					ephemeral: true,
				});
			}
		}
	} else if (interaction.isButton()) {
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
			console.error(err);
			Sentry.captureException(err);
		}
	}
});

client.login(process.env.DISCORD_TOKEN);

if (process.env.NODE_ENV == 'production') {
	app.set('trust proxy', 1);
}

const MemoryStore = memoryStore(session);

app.use(
	session({
		secret: process.env.CLIENT_SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MemoryStore({
			checkPeriod: 86400000,
		}),
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			domain: process.env.NODE_ENV === 'production' ? 'defly.monster' : null,
			maxAge: 1000 * 60 * 60 * 24, // One day
		},
	})
);

app.use(
	'/api/stats',
	(req, res, next) => {
		req.guildCount = client.guilds.cache.size;
		req.guilds = client.guilds.cache.map((guild) => ({
			available: guild.available,
			memberCount: guild.memberCount,
			owner: guild.ownerId,
			icon: guild.icon,
			id: guild.id,
			name: guild.name,
			joinedAt: guild.joinedAt,
			createdAt: guild.createdAt,
		}));
		req.uptime = client.uptime;
		req.isReady = client.isReady();

		next();
	},
	router
);

app.use(express.json());
app.use(cors());
app.use(
	express.static('./src/public', {
		root: process.cwd(),
	})
);
app.use(
	'/articles',
	express.static('./src/publicArticles', {
		extensions: ['html'],
		root: process.cwd(),
	})
);

app.use('/api', router);

app.get('*', (req, res) => {
	res.status(404);
	res.sendFile('./src/public/404.html', {
		root: process.cwd(),
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server working');
});
