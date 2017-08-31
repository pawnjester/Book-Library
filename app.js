const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken'); //used to create, sign and verify tokens


//set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

process.env.SECRET_KEY = 'jyurhitjkwowjwnbhjtotjhfhkjdshjdsgyhbjds';

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;