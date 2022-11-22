const { eliteTeams } = require('../util/eliteTeams.js');

module.exports = async (req, res) => {
	const eliteTeamList = await eliteTeams();

	res.json(eliteTeamList);
};
