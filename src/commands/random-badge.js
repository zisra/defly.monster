import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import config from '../config.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('random-badge')
		.setDescription('Gets a random badge for premium users'),
	command: async (interaction) => {
		const badgeNumber = Math.floor(Math.random() * config.MAX_BADGES) + 1;
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io badge ${badgeNumber}`)
			.setImage(`https://defly.io/img/badges/${badgeNumber}.png`)
			.setColor(config.EMBED.MAIN);

		await interaction.reply({ embeds: [embed] });
	},
};
