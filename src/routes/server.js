const Response = require('../util/apiResponse.js');

const { getTeams } = require('../util/getTeams.js');

module.exports = async (req, res) => {
	const region = req.query.region;
	const port = req.query.port;

	if (!region)
		return Response(res, {
			type: 'missingParameter',
			data: 'Missing region query parameter',
		});

	if (!port)
		return Response(res, {
			type: 'missingParameter',
			data: 'Missing port query parameter',
		});

	try {
		serverRes = await getTeams({ region, port });

		res.json(serverRes);
	} catch (err) {
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
