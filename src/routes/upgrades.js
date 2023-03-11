import Response from '../util/apiResponse.js';
import { generateUpgrades } from '../util/generateUpgrades.js';

export default async (req, res) => {
	try {
		const build = req.query.build;

		if (!build) {
			return Response(res, {
				type: 'missingParameter',
				data: 'Missing build query parameter',
			});
		}

		if (build.length !== 7) {
			return Response(res, {
				type: 'invalidParameter',
				data: 'Build must be 7 characters',
			});
		}

		if (build.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32) {
			return Response(res, {
				type: 'invalidParameter',
				data: 'Build must add up to 32',
			});
		}

		if (parseInt(req.query.height) > 1200) {
			return Response(res, {
				type: 'invalidParameter',
				data: 'height may not be greater than 1200',
			});
		}

		const upgrades = await generateUpgrades(
			build,
			req.query.format ?? 'svg',
			req.query.height
		);
		if (upgrades.format === 'svg') {
			res.setHeader('Content-Type', 'image/svg+xml');
			res.send(upgrades.data);
		} else if (upgrades.format === 'png') {
			res.setHeader('Content-Type', 'image/png');
			res.send(upgrades.data);
		}
	} catch (err) {
		Response(res, {
			type: 'serverError',
			err,
		});
	}
};
