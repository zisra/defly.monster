export default (req, res) => {
	req.session.destroy();
	res.redirect('/dashboard');
};
