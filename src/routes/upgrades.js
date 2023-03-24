import Response from '../util/apiResponse.js';
import { generateUpgrades } from '../util/generateUpgrades.js';

export default async (req, res) => {
	if (parseInt(req.query.height) > 1200) {
		return Response(res, {
			type: 'invalidParameter',
			data: 'Heigth cannot be greater than 1200',
		});
	}

	try {
		const build = req.query.build;
		if (!build) {
			throw new Error('Missing build query parameter');
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
		return Response(res, {
			type: 'invalidParameter',
			data: err.message,
		});
	}
};
