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
var about = require('./routes/about');
var contact = require('./routes/contact');

var app = express();

// Set application level variables
app.locals.app = {};
app.locals.app.title = config.title;
app.locals.app.copyright = config.copyright;
app.locals.app.menu = config.menu;
app.locals.app.contact = config.contact;
app.locals.app.social = config.social;

// Setup Development Mode
debug('env = ' + app.get('env'));
app.locals.app.dev = ('development' == app.get('env'));
debug('dev = ' + app.locals.app.dev);
if (app.locals.app.dev) {
  app.use(logger('dev'));
}

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || config.port);

app.use(compression({ threshold: 256 }));
app.use(favicon(__dirname + config.icon));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (!app.locals.app.dev) {
  app.use(minify({cache: path.join(__dirname, 'cache')}));
}
app.use(express.static(path.join(__dirname, 'assets')));

// Setup Routing
app.use('/', index);
app.use('/portfolio', portfolio);
app.use('/about', about);
app.use('/contact', contact);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler
// Will print stacktrace
if (app.locals.app.dev) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start the server
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = server;