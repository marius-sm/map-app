var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to MongoDB
//mongoose.connect('mongodb://Marius:mdpmarius1@ds151631.mlab.com:51631/mapapp', { useNewUrlParser: true });
mongoose
	.connect('mongodb://localhost:27017/mapapp', { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err))

var db = mongoose.connection;

// use sessions for tracking logins
app.use(session({
  secret: 'notre secret',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404).send("Sorry, can't find that !")
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
