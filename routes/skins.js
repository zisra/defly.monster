module.exports = async (req, res) => {
	const id = req.query.id;
	if (id) {
		res.sendFile(`skins/skin${id}.txt`, {
			root: process.cwd(),
		});
	} else {
		res.json({
			success: false,
			message: 'No skin ID given',
		});
	}
};