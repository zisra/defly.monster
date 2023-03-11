import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
	escapeMarkdown,
} from 'discord.js';

import config from '../config.js';
import { eliteTeams } from '../util/eliteTeams.js';
import { escapeEmojis } from '../util/escapeEmojis.js';

export default {
	arguments: ['team'],
	description: 'Gets info on a given elite team',
	interaction: new SlashCommandBuilder()
		.setName('elite-team')
		.setDescription('Gets info on a given elite team')
		.addStringOption((option) =>
			option
				.setName('team')
				.setDescription('The elite team to show info about')
				.setRequired(true)
				.addChoices(
					...Object.keys(config.ELITE_TEAMS).map((team) => ({
						name: config.ELITE_TEAMS[team].name,
						value: team,
					}))
				)
		),
	command: async (message, args) => {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(
					`https://docs.google.com/spreadsheets/d/${config.SPREADSHEET_ID}/`
				)
				.setLabel('Source')
				.setStyle(ButtonStyle.Link)
		);
		const team = message.interaction ? args.team : args[0];

		if (!team || !config.ELITE_TEAMS[team]) {
			return message.reply({
				content: `Please select an elite team: ${Object.keys(
					config.ELITE_TEAMS
				).join(', ')}.`,
				components: [row],
				ephemeral: true,
			});
		}
		const teamList = await eliteTeams();

		const embed = new EmbedBuilder()
			.setColor(config.ELITE_TEAMS[team].color)
			.setThumbnail(
				`https://cdn.discordapp.com/emojis/${config.ELITE_TEAMS[team].emoji}.png`
			)
			.setTitle(config.ELITE_TEAMS[team].name)
			.setDescription(
				`**Captain:** [${escapeEmojis(
					escapeMarkdown(teamList[team][0]?.value ?? 'N/A')
				)}](https://discord.com/users/${teamList[team][0]?.note ?? ''})
					**Vice Captain:** [${escapeEmojis(
						escapeMarkdown(teamList[team][1]?.value ?? 'N/A')
					)}](https://discord.com/users/${teamList[team][1]?.note ?? ''})
		 ${teamList[team]
				.slice(2)
				.map(
					(name) =>
						`[${escapeEmojis(
							escapeMarkdown(name.value)
						)}](https://discord.com/users/${name.note})`
				)
				.join('\n')}`
			);
		await message.reply({ embeds: [embed], components: [row] });
	},
};
