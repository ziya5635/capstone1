

module.exports = {
	index: (req, res) => {
		res.locals = {title: 'home page'};
		res.render('home');
		//res.send('This is home page.');
	}
}