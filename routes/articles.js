const path = require('path');

module.exports = async (req, res) => {
	res.sendFile(path.join(__dirname + './articles.json'));
};
