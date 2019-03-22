var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-demo', {useNewUrlParser: true,useCreateIndex:true});
mongoose.set('useCreateIndex', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
          secret:'secretxxxx',
          saveUninitialized:true,
          resave:true,
          cookie:{maxAge:60000}
}));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); 
app.use('/users', usersRouter);

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


//Handler WebSocket

module.exports = app;

