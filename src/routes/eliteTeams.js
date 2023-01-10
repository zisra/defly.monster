const Response = require('../util/apiResponse.js');

const { eliteTeams } = require('../util/eliteTeams.js');

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
