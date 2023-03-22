import { EmbedBuilder, SlashCommandBuilder, time } from 'discord.js';

import config from '../config.js';
import { getServers } from '../util/getServers.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Find out what tournaments are coming up'),
	command: async (interaction) => {
		const serverRes = await getServers(1);
		if (!serverRes.event) {
			await interaction.reply('There is no event at the moment.');
		} else {
			const embed = new EmbedBuilder()
				.setDescription(serverRes.event.details)
				.setTitle(
					`${serverRes.event.title} | ${time(
						new Date(serverRes.event.date),
						'R'
					)}`
				)
				.setTimestamp(new Date(serverRes.event.date))
				.setColor(config.EMBED.MAIN);
			await interaction.reply({ embeds: [embed] });
		}
	},
};
