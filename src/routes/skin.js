const config = require('../config.js');
const Response = require('../util/apiResponse.js');

module.exports = async (req, res) => {
	try {
		const id = req.query.id;

		if (!id)
			return Response(res, {
				type: 'missingParameter',
				data: 'Missing query ID parameter',
			});

		if (parseInt(id < 1))
			return Response(res, {
				type: 'invalidParameter',
				data: 'ID cannot be less than 1',
			});

		if (parseInt(id) > config.MAX_SKINS)
			return Response(res, {
				type: 'invalidParameter',
				data: `ID cannot be greater than ${config.MAX_SKINS}`,
			});

		res.sendFile(`skins/skin${id}.txt`, {
			root: './src',
		});
	} catch (err) {
		return new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
