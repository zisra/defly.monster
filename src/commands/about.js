import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';

export default {
	arguments: false,
	description: 'Basic information & credits regarding the bot',
	interaction: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Basic information & credits regarding the bot'),
	command: async (message, args, client) => {
		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setTitle('About')
			.setDescription(
				`Hello! I'm ${client.user}. Invite the me if you are interested in defly.io and related meta commands! I have a set of commands. If you would like to see a list of all commands, type \`d?help\`. The prefix of this bot is \`d?\`, so if you want to use a command, you must send \`d?commandname\` followed by any arguments, which will be specified with \`<argumentname>\` in the help command. The bot was developed by <@${config.SECRETS.BOT_OWNER}>.`
			);

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL('https://defly.monster/')
				.setLabel('Visit website')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(config.INVITE_URL)
				.setLabel('Invite Bot')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(`https://discord.gg/${config.SUPPORT_GUILD}`)
				.setLabel('Join support')
				.setStyle(ButtonStyle.Link)
		);
		await message.reply({ embeds: [embed], components: [row] });
	},
};
