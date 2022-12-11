const Response = require('../util/apiResponse.js');

const { commands } = require('../util/commands.js');

module.exports = async (req, res) => {
	try {
		const commandList = await commands();
		res.json(commandList.filter((i) => !i.adminOnly));
	} catch (err) {
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
