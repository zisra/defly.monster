const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const { eliteTeams } = require('../util/eliteTeams.js');
const config = require('../config.js');

module.exports = {
	arguments: ['team'],
	description: 'Gets info on a given elite team',
	command: async (message, args, client) => {
		const eliteTeam = args[0];
		if (!args[0] || !config.ELITE_TEAM_NAMES.includes(args[0])) {
			return message.reply(
				`Please select an elite team: ${config.ELITE_TEAM_NAMES.join(
					', '
				)}. Source: <https://docs.google.com/spreadsheets/d/${
					config.SPREADSHEET_ID
				}/>`
			);
		} else {
			const eliteTeamList = await eliteTeams();

			const embed = new EmbedBuilder()
				.setColor(config.ELITE_TEAMS[eliteTeam].color)
				.setThumbnail(
					`https://cdn.discordapp.com/emojis/${config.TEAM_EMOJIS[eliteTeam]}.png`
				)
				.setTitle(`${args[0].replace('-', ' ').capitalize()}`)
				.setURL(
					`https://docs.google.com/spreadsheets/d/${config.SPREADSHEET_ID}/`
				)
				.setDescription(
					`**Captain:** ${eliteTeamList[eliteTeam][0]}
					**Vice Captain:** ${eliteTeamList[eliteTeam][1]}
		 ${eliteTeamList[eliteTeam].slice(2).join('\n').escapeMarkdown()}`
				);
			await message.reply({ embeds: [embed] });
		}
	},
};
