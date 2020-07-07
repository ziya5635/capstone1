const User = require('../models/user.js'),
	passport = require('passport');

module.exports = {
	index: (req, res, next) => {
		User.find()
			.then(users => {console.log(users);
				res.locals.users = users;
				res.locals.title = 'Users';
				next();
			})
			.catch(error => {
				next(error);
			})
	},

	indexView: (req, res) => {
		res.render('users/index');
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
		};
		User.register(userParams, req.body.password)
			.then(user => {
				if (user) {
					console.log(`${user} created successfully.`);
					req.flash('success', `${user.fullName} created successfully.`);
					res.locals.redirect = '/';
					next();
				}
			})
			.catch(error => {debugger;
				res.locals.redirect = '/users/new';
				req.flash('error', `${error.message}`);
				console.log('an error happend.');
				next();
			});
	},

	authenticate: passport.authenticate('local', {
		failureRedirect: '/',
		failureFlash: 'Failed to login, Please try again.',
		successRedirect: '/',
		successFlash: 'Logged in successfully.'
	}),

	logout: (req, res, next) => {
		req.logout();
		req.flash('success', 'You have successfully Logged out.');
		res.locals.redirect = '/';
		next();
	},

	show: (req, res) => {
		//const id = req.params.id;
		res.locals.title = 'Profile';
		res.render(`users/show`);
	},

	adminCheck: (req, res, next) => {
		const currentUser = res.locals.currentUser;
		if (res.locals.loggedIn && currentUser.email === 'ziya.yekta@gmail.com') {
			next();
		} else {
			//req.flash('error', `Make sure you are logged in and have admin access.`);
			//res.locals.skip = true;
			res.locals.flashMessages = {'error': 'Make sure you are logged in and have admin access to this page.'};
			res.locals.title = 'Error';
			res.status('403').render('404');
		}
	},

	edit: (req, res, next) => {

	},

	delete: (req, res, next) => {
		const userId = req.params.id;
		User.findByIdAndDelete(userId)
			.then(user => {
				req.flash('success', `${user.userName} deleted successfully.`);
				res.locals.redirect = '/users';
				next()
			})
			.catch(error => {
				req.flash('error', `An error occured as removing because ${error.message}`);
				res.locals.redirect = '/users';
				next();
			})
	}
}