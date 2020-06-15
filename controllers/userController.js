const User = require('../models/user.js'),
	passport = require('passport');

module.exports = {
	index: (req, res, next) => {
		next();
	},

	indexView: (req, res, next) => {
		next();
	},

	redirectView: (req, res) => {
		const redirectPath = res.locals.redirect;
		res.redirect(redirectPath);
	},

	new: (req, res, next) => {
		res.locals.title = 'New user';
		res.render('users/new');
		next();
	},

	create: (req, res, next) => {//279
		const userParams = {
			name: {
				first: req.body.firstName,
				last: req.body.lastName
			},
			email: req.body.email,
			userName: req.body.userName
		};debugger;
		//const newUser = new User(userParams);
		User.register(userParams, req.body.password)
			.then(user => {
				if (user) {
					console.log(`${user} created successfully.`);
					res.locals.redirect = '/';
					next();
				}
			})
			.catch(error => {
				res.locals.redirect = '/users/new';
				console.log('an error happend.');
				next();
			});
	},

	authenticate: passport.authenticate('local', {
		failureRedirect: '/users/login',
		failureFlash: 'Failed to login.',
		successFlash: '/',
		successFlash: 'Logged in'
	})
}