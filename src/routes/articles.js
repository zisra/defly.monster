const Response = require('../util/apiResponse.js');

module.exports = async (req, res) => {
	try {
		res.sendFile('articles.json', {
			root: './src'
		});
	} catch (err) {
		new Response(res,{
			type: 'serverError',
			err, 
		})
	}
};
