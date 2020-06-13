const express = require('express'),
	homeController = require('./controllers/homeController'),
	expressLayouts = require('express-ejs-layouts'),
	morgan = require('morgan'),
	mongooge = require('mongoose');




const app = express();


app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(expressLayouts);
app.use(morgan('combined'));

app.get('/', homeController.index);


app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`);
});