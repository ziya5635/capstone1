

module.exports = {
	index: (req, res) => {
		res.locals.title = 'Home page';
		res.locals.user = req.user;
		res.render('home');
	
	}
}