var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
//var db_Router = require('./router/db');
var keyboard_Router = require('./router/keyboard');
var message_Router = require('./router/message');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/keyboard', keyboard_Router);
app.use('/message', message_Router);

http.createServer(app).listen(8000, function(){
    console.log('server on');
});