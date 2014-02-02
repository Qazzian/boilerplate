var express = require('express'),
    http = require('http'),
    path = require('path');

var routes = require('./routes'),
    config = require('./config'),
    dal = require('./db/dal');


// init application
var app = express();
app.configure(function () {

    app.set('env', 'development');
    app.set('port', 3030);

    config.environment(app.get('env'));

    app.use(express.bodyParser()); // used to parse JSON object given in the request body

    app.set('port', app.get('port'));

    app.use(express.logger(app.get('env')));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    app.use(app.router);

//app.use(express.cookieParser('[[SECERET_KEY]]'));

});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//routes list:
routes.initialize(app);

//connect to mongo
dal.connect();

//finally boot up the server:
http.createServer(app).listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));
});
