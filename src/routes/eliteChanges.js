const { eliteTeams } = require('../util/eliteTeams.js');
const config = require('../config.js');

const { WebhookClient, EmbedBuilder } = require('discord.js');
const deepDiff = require('deep-diff-pizza');

const fs = require('fs');

function convertTeams(teams) {
	let output = {};
	for (let team in teams) {
		let players = {};
		teams[team].forEach((t) => {
			players[t.value] = t.note;
		});
		output[team] = players;
	}
	return output;
}

module.exports = async (req, res) => {
	const teamList = convertTeams(await eliteTeams());

	const previousTeamList = JSON.parse(
		fs.readFileSync('./src/eliteTeams.json', 'utf8')
	);

	if (JSON.stringify(teamList) !== JSON.stringify(previousTeamList)) {
		let changes = deepDiff(previousTeamList, teamList)
			.filter(
				(change) => change.operation == 'ADDED' || change.operation == 'REMOVED'
			)
			.map((change) => ({
				operation: change.operation.toLowerCase(),
				team: change.path.split('.')[0],
				player: change.path.split('.')[1],
				discordId: change.is || change.was,
			}));

		if (changes.length == 0) {
			return res.json({
				message: 'No changes',
			});
		}

		const webhook = new WebhookClient({
			url: process.env.ELITE_CHANGES_WEBHOOK,
		});

		const embeds = changes.map((change) => {
			return new EmbedBuilder()
				.setColor(config.EMBED.MAIN)
				.setTitle(`Player ${change.operation.capitalize()}`)
				.setDescription(
					`**${change.player}** was **${change.operation}** ${
						change.operation == 'added' ? 'to' : 'from'
					} **${change.team.replace('-', ' ').capitalize()}**`
				)
				.setTimestamp();
		});

		await webhook.send({
			embeds: embeds.slice(0, 10),
		});

		res.json(changes);
	} else {
		res.json({
			message: 'No changes',
		});
	}

	fs.writeFileSync('./src/eliteTeams.json', JSON.stringify(teamList));
};
