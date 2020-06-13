const User = require('../models/user.js');

module.exports = {
	index: (req, res, next) => {
		next();
	},

	indexView: (req, res, next) => {
		next();
	},

	new: (req, res, next) => {
		res.locals.title = {title: 'New user'};
		res.render('users/new');
		next();
	},

	create: (req, res, next) => {

	}
}