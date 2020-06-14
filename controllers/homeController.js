

module.exports = {
	index: (req, res) => {
		res.locals.title = 'Home page';
		res.render('home');
	
	}
}