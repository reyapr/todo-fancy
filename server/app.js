const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const homeRouter = require('./routes/homePage');
const todoRouter = require('./routes/todo');
const cors = require('cors')

const env = require('dotenv').config()

const username = process.env.USERDB
const pass = process.env.PASSWORD

const mongoose = require('mongoose')
// mongoose.connect(`mongodb://localhost/todo-fancy`)
mongoose.connect(`mongodb://${username}:${pass}@ds113200.mlab.com:13200/todo-fancy`)


const app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/user/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
