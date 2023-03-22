import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import config from '../config.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('badges')
		.setDescription('Gets a list of all badges for premium user'),
	command: async (interaction, args, client) => {
		const embed = new EmbedBuilder()
			.setTitle('Defly.io badges')
			.setDescription(
				client.guilds.cache
					.get('877177181413994496')
					.emojis.cache.map((e) => e.toString())
					.sort()
					.join(' ')
			)
			.setColor(config.EMBED.MAIN);

		await interaction.reply({ embeds: [embed] });
	},
};
