var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var db_create_Router = require('./router/db_create');
var db_insert_Router = require('./router/db_insert');
var db_delete_Router = require('./router/db_delete');
var keyboard_Router = require('./router/keyboard');
var message_Router = require('./router/message');
var cron = require('node-cron');

cron.schedule('0 0 0 * * *', function(){    // 매일 자정에 db 초기화 -> 버스 시간표가 바뀔 수 있으므로 매일 업데이트해주는 개념
    console.log('crontab on!!');
    db_delete_Router.db_delete();   // db 삭제 -> 정확히는 각 collection들을 삭제 -> ./router/db_delete.js의 db_delete()를 실행
    setTimeout(function() {     // db_delete()이 끝나기도 전에 insert()가 실행되는 것을 방지
        db_insert_Router.insert();    // ./router/db.insert.js 실행
    }, 1000)
});

db_create_Router.db_create();       // ./router/db.create.js 실행

setTimeout(function() {
    db_insert_Router.insert();    // ./router/db.insert.js 실행
}, 1000)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/keyboard', keyboard_Router);
app.use('/message', message_Router);

http.createServer(app).listen(8000, function(){
    console.log('server on');
});
