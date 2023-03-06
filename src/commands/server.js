import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import Sentry from '@sentry/node';
import axios from 'axios';
import config from '../config.js';

export default {
	arguments: ['region (use, usw, eu)', 'port (3005,3015,3025)'],
	description: 'Get the teams and their players for the specified server',
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
						name: `${region.name}${region.working ? '' : ' (not working)'}`,
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
	command: async (message, args, client) => {
		const serverRegion = message.interaction ? args.region : args[0];
		const serverPort = message.interaction ? args.port : args[1];
		let serverRes;

		if (!serverPort || !serverRegion) {
			return message.reply({
				content: `Something went wrong getting teams`,
				ephemeral: true,
			});
		}

		try {
			let { data } = await axios.get(config.CLOUDFLARE_WORKER_URL, {
				params: {
					region: serverRegion,
					port: serverPort,
				},
			});

			serverRes = data;
		} catch (err) {
			console.error(err);
			Sentry.captureException(err);
			return message.reply({
				content: `Something went wrong getting teams`,
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
												e.name +
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

		await message.reply({ embeds: [embed] });
	},
};
