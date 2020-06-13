

module.exports = {
	index: (req, res) => {
		res.locals.title = {title: 'Home page'};
		res.render('home');
	
	}
}