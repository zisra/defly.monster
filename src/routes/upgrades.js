const { generateUpgrades } = require('../util/generateUpgrades.js');
const Response = require('../util/apiResponse.js');

module.exports = async (req, res) => {
	try {
		const build = req.query.build;

		if(!build) return Response(res, {
			type: 'missingParameter',
			data: 'Missing query build parameter'
		})

		if(build.length !== 7) return Response(res, {
			type: 'invalidParameter',
			data: 'Build must be 7 characters'
		})

		if(build.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32) return Response(res, {
			type: 'invalidParameter',
			data: 'Build must add up to 32'
		})
		
		if(parseInt(req.query.ppi) > 500) return Response(res, {
			type: 'invalidParameter',
			data: 'ppi may not be greater than 500'
		})

		
			const upgrades = await generateUpgrades(
				build,
				req.query.format ?? 'svg',
				req.query.ppi
			);
			if (upgrades.format === 'svg') {
				res.setHeader('Content-Type', 'image/svg+xml');
				res.send(upgrades.data);
			} else if (upgrades.format === 'png') {
				res.setHeader('Content-Type', 'image/png');
				res.send(upgrades.data);
			}
	} catch (err) {
		Response(res,{
			type:'serverError',
			err,
		})
	} 
};
