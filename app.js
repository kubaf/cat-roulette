
/**
 * Module dependencies.
 */

var express = require('express');
var device = require('express-device');
var routes = require('./routes');
var user = require('./routes/user');
var cat = require('./routes/cat');
var http = require('http');
var path = require('path');

var app = express();

// express-device config for detecting mobile devices
app.use(device.capture());
app.enableDeviceHelpers();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/cats.json', cat.list);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
