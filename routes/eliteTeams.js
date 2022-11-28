const Response = require('../util/apiResponse.js');

const { eliteTeams } = require('../util/eliteTeams.js');

module.exports = async (req, res) => {
	try {
		const eliteTeamList = await eliteTeams();

		res.json(eliteTeamList);
	} catch(err) {
		new Response(res,{
			type: 'serverError',
			err, 
		})
	}
};
