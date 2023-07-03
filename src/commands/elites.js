import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';
import { eliteDefuse } from '../util/eliteDefuse.js';
import { eliteTeams } from '../util/eliteTeams.js';

function searchPlayer(data, id) {
	for (const key of Object.keys(data)) {
		const team = data[key];
		const player = team.find((player) => player.note === id.toString());
		if (player) {
			return {
				team: key,
				...player,
			};
		}
	}
}

export default {
	interaction: new SlashCommandBuilder()
		.setName('elites')
		.setDescription('Get info about elite teams')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('defuse')
				.setDescription('Gets info on a given elite team (defuse team)')
				.addStringOption((option) =>
					option
						.setName('team')
						.setDescription('The team to show info about')
						.setRequired(true)
						.addChoices(
							...Object.keys(config.ELITE_DEFUSE_MODE.TEAMS).map((team) => ({
								name: config.ELITE_DEFUSE_MODE.TEAMS[team].name,
								value: team,
							}))
						)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('teams')
				.setDescription('Gets info on a given elite team (teams mode)')
				.addStringOption((option) =>
					option
						.setName('team')
						.setDescription('The team to show info about')
						.setRequired(true)
						.addChoices(
							...Object.keys(config.ELITE_TEAMS_MODE.TEAMS).map((team) => ({
								name: config.ELITE_TEAMS_MODE.TEAMS[team].name,
								value: team,
							}))
						)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('player')
				.setDescription(
					'See if a user is an elite member, and which team they are on.'
				)
				.addUserOption((option) =>
					option
						.setRequired(true)
						.setName('user')
						.setDescription('The user to check')
				)
		),
	subcommands: {
		defuse: async (interaction) => {
			const team = interaction.options.getString('team');

			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setURL(
						`https://docs.google.com/spreadsheets/d/${config.ELITE_DEFUSE_MODE.SPREADSHEET_ID}/`
					)
					.setLabel('Source')
					.setStyle(ButtonStyle.Link)
			);

			if (!team || !config.ELITE_DEFUSE_MODE.TEAMS[team]) {
				return interaction.reply({
					content: `Please select an elite team: ${Object.keys(
						config.ELITE_DEFUSE_MODE.TEAMS
					).join(', ')}.`,
					components: [row],
					ephemeral: true,
				});
			}
			const teamList = await eliteDefuse();

			const embed = new EmbedBuilder()
				.setColor(config.ELITE_DEFUSE_MODE.TEAMS[team].color)
				.setTitle(config.ELITE_DEFUSE_MODE.TEAMS[team].name)
				.setThumbnail(
					`https://defly.monster/api/heart?color=${encodeURIComponent(
						'#' + config.ELITE_DEFUSE_MODE.TEAMS[team].color
					)}&format=png`
				)
				.setDescription(
					`**Captain:** [${
						teamList[team][0]?.value ?? 'N/A'
					}](https://discord.com/users/${teamList[team][0]?.note ?? ''})
						**Vice Captain:** [${
							teamList[team][1]?.value ?? 'N/A'
						}](https://discord.com/users/${teamList[team][1]?.note ?? ''})
			 ${teamList[team]
					.slice(2)
					.map(
						(name) => `[${name.value}](https://discord.com/users/${name.note})`
					)
					.join('\n')}`
				);
			await interaction.reply({ embeds: [embed], components: [row] });
		},
		teams: async (interaction) => {
			const team = interaction.options.getString('team');

			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setURL(
						`https://docs.google.com/spreadsheets/d/${config.ELITE_TEAMS_MODE.SPREADSHEET_ID}/`
					)
					.setLabel('Source')
					.setStyle(ButtonStyle.Link)
			);

			if (!team || !config.ELITE_TEAMS_MODE.TEAMS[team]) {
				return interaction.reply({
					content: `Please select an elite team: ${Object.keys(
						config.ELITE_TEAMS_MODE.TEAMS
					).join(', ')}.`,
					components: [row],
					ephemeral: true,
				});
			}
			const teamList = await eliteTeams();

			const embed = new EmbedBuilder()
				.setColor(config.ELITE_TEAMS_MODE.TEAMS[team].color)
				.setThumbnail(
					`https://defly.monster/api/heart?color=${encodeURIComponent(
						'#' + config.ELITE_TEAMS_MODE.TEAMS[team].color
					)}&format=png`
				)
				.setTitle(config.ELITE_TEAMS_MODE.TEAMS[team].name)
				.setDescription(
					`**Captain:** [${
						teamList[team][0]?.value ?? 'N/A'
					}](https://discord.com/users/${teamList[team][0]?.note ?? ''})
						**Vice Captain:** [${
							teamList[team][1]?.value ?? 'N/A'
						}](https://discord.com/users/${teamList[team][1]?.note ?? ''})
			 ${teamList[team]
					.slice(2)
					.map(
						(name) => `[${name.value}](https://discord.com/users/${name.note})`
					)
					.join('\n')}`
				);
			await interaction.reply({ embeds: [embed], components: [row] });
		},

		player: async (interaction) => {
			const user = interaction.options.getUser('user');

			const teamMembers = await eliteTeams();
			const defuseMembers = await eliteDefuse();

			const team = searchPlayer(teamMembers, user.id);
			const defuse = searchPlayer(defuseMembers, user.id);

			if (!team && !defuse) {
				return interaction.reply({
					content: `${user} is not an elite member.`,
					ephemeral: true,
				});
			}

			const embed = new EmbedBuilder();
			embed.setColor(config.EMBED.MAIN);
			embed.setDescription(`${user} is on the following elite teams:`);

			if (team) {
				embed.addFields({
					name: 'Teams elites',
					value: `${config.ELITE_TEAMS_MODE.TEAMS[team.team].name} - ${
						team.value
					}`,
				});
			}

			if (defuse) {
				embed.addFields({
					name: 'Defuse elites',
					value: `${config.ELITE_DEFUSE_MODE.TEAMS[defuse.team].name} - ${
						defuse.value
					}`,
				});
			}

			return interaction.reply({
				embeds: [embed],
			});
		},
	},
};
