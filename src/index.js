import fs from 'node:fs';
import util from 'node:util';

import Sentry from '@sentry/node';
import cors from 'cors';
import {
	AttachmentBuilder,
	Client,
	EmbedBuilder,
	Events,
	GatewayIntentBits,
	Partials,
} from 'discord.js';
import express from 'express';
import session from 'express-session';
import memoryStore from 'memorystore';

import generateArticles from './articles.js';
import config from './config.js';
import router from './router.js';

const app = express();
const MemoryStore = memoryStore(session);
const assetFiles = fs.readdirSync('./src/images');

Sentry.init({
	dsn: config.SECRETS.SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: config.SECRETS.NODE_ENV,
});

generateArticles();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.DirectMessages,
	],
	allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
	partials: [Partials.Channel],
});

client.on(Events.ClientReady, async (client) => {
	console.log('Bot working');
	client.user.setActivity(config.ACTIVITY);
	client.application.commands.fetch();
});

client.on(Events.ShardError, (error, id) => {
	console.warn(error);
	Sentry.captureEvent({ message: 'Shard Error', id });
});

client.on(Events.Warn, (warning) => {
	console.warn(warning);
	Sentry.captureEvent({ message: 'Warning', warning });
});

client.on(Events.MessageCreate, async (message) => {
	if (message.author.id === client.user.id) return;
	let args;

	if (message.content.startsWith(config.PREFIX)) {
		args = message.content.slice(config.PREFIX.length).trim().split(' ');
	} else if (message.content.includes(client.user.toString())) {
		args = message.content
			.slice(client.user.toString().length)
			.trim()
			.split(' ');
	} else {
		return;
	}

	const command = args.shift().toLowerCase();
	if (command === 'eval' && message.author.id === config.SECRETS.BOT_OWNER) {
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
			message.reply({ embeds: [evalEmbed] });
		} catch (err) {
			console.error(err);
			const code = args.join(' ');
			const errEmbed = new EmbedBuilder()
				.setTitle('Error')
				.setDescription(
					`**Input:**\`\`\`js\n${code}\`\`\`\n**Output:**\`\`\`xl\n${err}\`\`\``
				)
				.setColor(config.EMBED.ERROR);
			message.reply({ embeds: [errEmbed] });
		}
	} else {
		message.reply(
			`Text commands will soon be deprecated. Please use slash commands instead. If you need a list of commands, run </help:${config.HELP_COMMAND_ID}>`
		);
	}
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.commandName;
		const commandFolder = fs.readdirSync('./src/commands');

		if (commandFolder.find((i) => i === `${command}.js`)) {
			const { default: commandFile } = await import(`./commands/${command}.js`);
			try {
				interaction.interaction = true;
				if (commandFile.adminOnly) return;
				if (commandFile.subcommands) {
					commandFile.subcommands[interaction.options.getSubcommand()](
						interaction,
						client
					);
				} else {
					commandFile.command(interaction, client);
				}
			} catch (err) {
				console.log(err);
				Sentry.captureException(err);

				await interaction.reply({
					content: `Something went wrong with this command. Please try again soon. If you need a list of commands, run </help:${config.HELP_COMMAND_ID}>`,
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
	} else if (interaction.isAutocomplete()) {
		if (interaction.commandName === 'asset') {
			await interaction.respond(
				assetFiles
					.filter((choice) =>
						choice.startsWith(interaction.options.getFocused())
					)
					.map((choice) => ({ name: choice, value: choice }))
					.slice(0, 25)
			);
		}
	}
});

client.login(config.SECRETS.DISCORD_TOKEN);

if (config.SECRETS.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
}

app.use(
	session({
		secret: config.SECRETS.CLIENT_SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MemoryStore({
			checkPeriod: 86400000,
		}),
		cookie: {
			secure: config.SECRETS.NODE_ENV === 'production',
			domain: config.SECRETS.NODE_ENV === 'production' ? 'defly.monster' : null,
			maxAge: 7 * 1000 * 60 * 60 * 24, // 7 days
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

app.listen(config.SECRETS.PORT || 3000, () => {
	console.log('Server working');
});
