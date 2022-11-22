const { generateUpgrades } = require('../util/generateUpgrades.js');

module.exports = async (req, res) => {
	const build = req.query.build;

	if (
		build.length !== 7 ||
		build.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32 ||
		!build
	) {
		return res.status(400).json({
			success: false,
			error: 'Invalid build number',
		});
	} else {
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
	}
};
