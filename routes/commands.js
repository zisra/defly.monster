const { commands } = require('../util/commands.js');

module.exports = async (req, res) => {
	const commandList = await commands();

	res.json(commandList);
};
