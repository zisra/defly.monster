import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import config from '../config.js';

export default {
	arguments: false,
	description: 'Make an excuse for your embarrassing death',
	interaction: new SlashCommandBuilder()
		.setName('excuse')
		.setDescription('Make an excuse for your embarrassing death'),
	command: async (message, args, client) => {
		const excuse =
			config.EXCUSES[Math.floor(Math.random() * config.EXCUSES.length)];
		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setTitle('Your random excuse')
			.setDescription(excuse);
		message.reply({ embeds: [embed] });
	},
};
