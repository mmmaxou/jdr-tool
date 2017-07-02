#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var compression = require('compression');
var MongoClient = require('mongodb').MongoClient;
var debug = require('debug')('src:server');
var http = require('http');


var config = require('./config');
var Index = require('./controllers/Index');
var Admin = require('./controllers/Admin');
var Create = require('./controllers/Create');
var Room = require('./controllers/Room');
var IoLogic = require('./IoLogic');

var app = express(),
  server,
  db,
  io

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression())
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(expressValidator());
// database
app.use(function (req, res, next) {
  req.db = db;
  next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', function (req, res, next) {
  Index.run(req, res, next);
})
app.all('/admin', function (req, res, next) {
  Admin.run(req, res, next);
})
app.all('/admin-room-:id', function (req, res, next) {
  Admin.room(req, res, next);
})
app.all('/room-:id', function (req, res, next) {
  Room.run(req, res, next);
})
app.all('/create', function (req, res, next) {
  Create.run(req, res, next);
})


console.log("__ Connecting to database")
MongoClient.connect(config("mongo").url, function (err, database) {
  if (err) {
    console.log('Sorry, there is no mongo db server running.', err);
  } else {
    console.log("__ Database connected");
    db = database
    server = http.createServer(app);
    server.listen(port, function () {
      console.log("__ server running");
    });
    server.on('error', onError);
    server.on('listening', onListening);

    // sockets.io
    
    io = IoLogic(server, db)
  }
});







// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}
