// Modules
var debug = require('debug')('ChrisWeb');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var minify = require('express-minify');

var config = require('./config.json');
var index = require('./routes/index');
var portfolio = require('./routes/portfolio');
var aboutMe = require('./routes/aboutme');
var contact = require('./routes/contact');

var app = express();
debug('env = ' + app.get('env'));
app.locals.dev = ('development' == app.get('env'));
debug('dev = ' + app.locals.dev);

//Set application level variables
app.locals.title = config.title;
app.locals.copyright = config.copyright;
app.locals.menu = config.menu;
app.locals.contact = config.contact;
app.locals.social = config.social;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || config.port);

if (app.locals.dev) {
  app.use(logger('dev'));
}

app.use(compression({ threshold: 512 }));
app.use(favicon(__dirname + config.icon));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(minify({cache: path.join(__dirname, 'cache')}));
app.use(express.static(path.join(__dirname, 'assets')));

// Setup Routing
app.use('/', index);
app.use('/portfolio', portfolio);
app.use('/aboutme', aboutMe);
app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.locals.dev) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Start the server
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = server;