import Response from '../util/apiResponse.js';

export default (req, res) => {
	const { accessToken, refreshToken, userId, username, isAdmin } = req.session;
	if (accessToken) {
		res.json({ accessToken, refreshToken, userId, username, isAdmin });
	} else {
		return Response(res, {
			type: 'unauthorized',
		});
	}
};
