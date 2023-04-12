import Response from '../util/apiResponse.js';
import { eliteDefuse } from '../util/eliteDefuse.js';

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
	try {
		let eliteTeamList = await eliteDefuse();

		if (req.query.version == 2) {
			eliteTeamList = convertTeams(eliteTeamList);
		}

		res.json(eliteTeamList);
	} catch (err) {
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
