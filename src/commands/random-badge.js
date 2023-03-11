import config from '../config.js';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
	arguments: false,
	description: 'Gets a random badge for premium users',
	interaction: new SlashCommandBuilder()
		.setName('random-badge')
		.setDescription('Gets a random badge for premium users'),
	command: async (message) => {
		const badgeNumber = Math.floor(Math.random() * config.MAX_BADGES) + 1;
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io badge ${badgeNumber}`)
			.setImage(`https://defly.io/img/badges/${badgeNumber}.png`)
			.setColor(config.EMBED.MAIN);

		await message.reply({ embeds: [embed] });
	},
};
