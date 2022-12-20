const {
	EmbedBuilder,
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');
const axios = require('axios');

const { eliteTeams } = require('../util/eliteTeams.js');
const config = require('../config.js');

module.exports = {
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
					...config.ELITE_TEAM_NAMES.map((team) => ({
						name: team.replace('-', ' ').capitalize(),
						value: team,
					}))
				)
		),
	command: async (message, args, client) => {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(
					`https://docs.google.com/spreadsheets/d/${config.SPREADSHEET_ID}/`
				)
				.setLabel('Source')
				.setStyle(ButtonStyle.Link)
		);
		const team = message.interaction ? args.team : args[0];

		if (!team || !config.ELITE_TEAM_NAMES.includes(team)) {
			return message.reply({
				content: `Please select an elite team: ${config.ELITE_TEAM_NAMES.join(
					', '
				)}.`,
				components: [row],
				ephemeral: true,
			});
		}
		const teamList = await eliteTeams();

		const embed = new EmbedBuilder()
			.setColor(config.ELITE_TEAMS[team].color)
			.setThumbnail(
				`https://cdn.discordapp.com/emojis/${config.TEAM_EMOJIS[team]}.png`
			)
			.setTitle(`${team.replace('-', ' ').capitalize()}`)
			.setDescription(
				`**Captain:** [${teamList[team][0].value}](https://discord.com/users/${
					teamList[team][0].note
				})
					**Vice Captain:** [${teamList[team][1].value}](https://discord.com/users/${
					teamList[team][1].note
				})
		 ${teamList[team]
				.slice(2)
				.map(
					(name) => `[${name.value}](https://discord.com/users/${name.note})`
				)
				.join('\n')
				.escapeMarkdown()}`
			);
		await message.reply({ embeds: [embed], components: [row] });
	},
};
