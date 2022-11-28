const Response = require('../util/apiResponse.js');

const path = require('path');

module.exports = async (req, res) => {
	try {
		res.sendFile(path.join(__dirname + './articles.json'));
	} catch (err) {
		new Response(res,{
			type: 'serverError',
			err, 
		})
	}
};
