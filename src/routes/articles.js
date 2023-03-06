import Response from '../util/apiResponse.js';

export default async (req, res) => {
	try {
		res.sendFile('articles.json', {
			root: './src',
		});
	} catch (err) {
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
