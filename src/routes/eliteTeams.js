import Response from '../util/apiResponse.js';
import { eliteTeams } from '../util/eliteTeams.js';
import { convertTeams } from '../util/convertTeams.js';

export default async (req, res) => {
	try {
		let eliteTeamList = await eliteTeams();

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
