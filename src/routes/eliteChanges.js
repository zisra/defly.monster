import deepDiff from 'deep-diff-pizza';
import { EmbedBuilder, WebhookClient } from 'discord.js';

import config from '../config.js';
import database from '../database.js';
import { eliteTeams } from '../util/eliteTeams.js';

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertTeams(teams) {
	const output = {};
	for (const team in teams) {
		const players = {};
		teams[team].forEach((t) => {
			players[t.value] = t.note;
		});
		output[team] = players;
	}
	return output;
}

export default async (req, res) => {
	const teamList = convertTeams(await eliteTeams());

	const previousTeamList = await database.get('elite-teams');

	if (JSON.stringify(teamList) !== JSON.stringify(previousTeamList)) {
		const changes = deepDiff(previousTeamList, teamList)
			.filter(
				(change) =>
					change.operation === 'ADDED' || change.operation === 'REMOVED'
			)
			.map((change) => ({
				operation: change.operation.toLowerCase(),
				team: change.path.split('.')[0],
				player: change.path.split('.')[1],
				discordId: change.is || change.was,
			}));

		if (changes.length === 0) {
			return res.json({
				message: 'No changes',
			});
		}

		const webhook = new WebhookClient({
			url: config.SECRETS.ELITE_CHANGES_WEBHOOK,
		});

		const embeds = changes.map((change) => {
			return new EmbedBuilder()
				.setColor(config.EMBED.MAIN)
				.setTitle(`Player ${capitalize(change.operation)}`)
				.setDescription(
					`**${change.player}** was **${change.operation}** ${
						change.operation == 'added' ? 'to' : 'from'
					} **${config.ELITE_TEAMS_MODE.TEAMS[change.team].name}**`
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

	database.set('elite-teams', teamList);
};
