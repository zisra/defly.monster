import Response from '../util/apiResponse.js';

export default async (req, res) => {
	if (req.session.isAdmin) {
		try {
			const response = {
				guildCount: req.guildCount,
				guilds: req.guilds,
				uptime: req.uptime,
				isReady: req.isReady,
			};
			res.json(response);
		} catch (err) {
			new Response(res, {
				type: 'serverError',
				err,
			});
		}
	} else {
		return Response(res, {
			type: 'unauthorized',
		});
	}
};
