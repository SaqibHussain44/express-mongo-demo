var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('./models/logs');
require('./models/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users.routes');
var logsRouter = require('./routes/logs/logs.routes');

var app = express();
mongoose.connect('mongodb://demo:demo123@ds261277.mlab.com:61277/demo-01', {useNewUrlParser: true}).then(res => {
  console.log('connected');
}).catch(err => {
  console.error(err)
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('error', err)
  res.send({error: err})
});

module.exports = app;
