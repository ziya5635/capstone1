const express = require('express'),
	homeController = require('./controllers/homeController'),
	userController = require('./controllers/userController'),
	expressLayouts = require('express-ejs-layouts'),
	morgan = require('morgan'),
	mongoose = require('mongoose');

const app = express();

// db configs //
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/capstone_1',
 {useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

// configs //
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(expressLayouts);
app.use(morgan('combined'));


//  routes //
app.get('/', homeController.index);
app.get('/users/new', userController.new);

app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`);
});