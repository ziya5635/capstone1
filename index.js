const express = require('express'),
	homeController = require('./controllers/homeController'),
	userController = require('./controllers/userController'),
	expressLayouts = require('express-ejs-layouts'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = require('./models/user'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	connectFlash = require('connect-flash');

// db configs //
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/capstone_1',
 	{useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;


const app = express();
// configs //
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.use(morgan('combined')); 

app.use(cookieParser(process.env.PASSCODE));
app.use(expressSession({
	secret: process.env.PASSCODE,
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
}));
app.use(connectFlash());
app.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	res.locals.loggedIn = req.isAuthenticated(); //method added by passport module
	res.locals.currentUser = req.user; 
	next();
});
app.use(passport.initialize());
app.use(passport.session()); //tells passport to use previous sessions

//eslint index.js 

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  routes //
app.get('/', homeController.index);
app.get('/users/new', userController.new);
app.post('/users/create', userController.create, userController.redirectView);
app.get('/users/login', userController.authenticate);
app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`);
});