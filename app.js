var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var db_fetch_Router = require('./router/db_fetch');
var keyboard_Router = require('./router/keyboard');
var message_Router = require('./router/message');

db_fetch_Router.fetch();    // ./router/db.fetch.js 실행

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/keyboard', keyboard_Router);
app.use('/message', message_Router);

http.createServer(app).listen(8000, function(){
    console.log('server on');
});
