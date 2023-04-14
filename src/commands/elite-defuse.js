import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
	escapeMarkdown,
} from 'discord.js';

import config from '../config.js';
import { eliteDefuse } from '../util/eliteDefuse.js';
import { escapeEmojis } from '../util/escapeEmojis.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('elite-defuse')
		.setDescription('Gets info on a given elite defuse team')
		.addStringOption((option) =>
			option
				.setName('team')
				.setDescription('The elite team to show info about')
				.setRequired(true)
				.addChoices(
					...Object.keys(config.ELITE_DEFUSE_MODE.TEAMS).map((team) => ({
						name: config.ELITE_DEFUSE_MODE.TEAMS[team].name,
						value: team,
					}))
				)
		),
	command: async (interaction, args) => {
		const team = args.team;

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
				)})`
			)
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
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};
