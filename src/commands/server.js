import axios from 'axios';
import { EmbedBuilder, SlashCommandBuilder, escapeMarkdown } from 'discord.js';

import config from '../config.js';
import { escapeEmojis } from '../util/escapeEmojis.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Get the teams and thesir players for the specified server')
		.addStringOption((option) =>
			option
				.setName('region')
				.setDescription('Server region')
				.setRequired(true)
				.addChoices(
					...config.REGION_LIST.map((region) => ({
						name: region.name,
						value: region.alias,
					}))
				)
		)
		.addIntegerOption((option) =>
			option
				.setName('port')
				.setDescription('Server port')
				.setRequired(true)
				.addChoices(
					...config.PORT_LIST.map((port) => ({
						name: `${port.port} - ${port.mode}`,
						value: port.port,
					}))
				)
		),
	command: async (interaction, args, client) => {
		const serverRegion = interaction.interaction ? args.region : args[0];
		const serverPort = interaction.interaction ? args.port : args[1];
		let serverRes;

		if (!serverPort || !serverRegion) {
			return interaction.reply({
				content: 'Something went wrong getting teams',
				ephemeral: true,
			});
		}

		try {
			const { data } = await axios.get(config.CLOUDFLARE_WORKER_URL, {
				params: {
					region: serverRegion,
					port: serverPort,
				},
			});

			serverRes = data;
		} catch (err) {
			return interaction.reply({
				content:
					'Something went wrong getting teams - This server could possibly have a team that is closing the map',
				ephemeral: true,
			});
		}
		const defuseMode = serverPort.endsWith('2');

		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setTitle(`${serverRegion.toUpperCase()} ${serverPort}`)
			.setURL(
				`https://defly.io/#${defuseMode ? 2 : 1}-${
					config.REGION_LIST.find((i) => serverRegion === i.alias).ws
				}:${serverPort}`
			)
			.addFields(
				serverRes.map((u) => {
					return {
						name: !defuseMode
							? `${u.team.color} - ${Math.round(u.mapPercent)}% ${
									u.available ? '' : ':x:'
							  }`
							: `${u.team.color} ${u.available ? '' : ':x:'}`,
						value:
							u.players.length !== 0
								? u.players
										.map(
											(e) =>
												escapeEmojis(escapeMarkdown(e.name)) +
												' ' +
												(e.badge
													? client.guilds.cache
															.get('877177181413994496')
															.emojis.cache.find(
																(badge) =>
																	badge.name ===
																	`badge${
																		e.badge < 10 ? '0' + e.badge : e.badge
																	}`
															)
															.toString()
													: '')
										)
										.join(', ')
								: 'N/A',
					};
				})
			);

		await interaction.reply({ embeds: [embed] });
	},
};
