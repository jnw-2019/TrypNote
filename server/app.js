const path = require('path');
const volleyball = require('volleyball');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Logging
app.use(volleyball);

//Body Parsing for POST & PUT request
app.use(express.json());

//Cookie parser
//app.use(cookieParser());

//Use session middleware
// app.use(session({
//   key: 'uuid',
//   secret: 'needamoresecurekeynow',
//   resave: false,
//   saveUninitialized: false,
// }));

//Bundle file location and index.html
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//API Routes
app.use('/api', require('./api'));

//Error Handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error Handling to display db validations on the front end
app.use((error, req, res, next) => {
  let errors = [error];
  if (error.errors) {
    errors = error.errors.map(error => error.message);
  } else if (error.original) {
    errors = [error.original.message];
  }
  res.status(error.status || 500).send({ errors });
});

module.exports = app;
