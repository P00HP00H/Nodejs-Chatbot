var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = 'mongodb://db:27017/bus';
mongoose.connect(url);
var db = mongoose.connection;
var bus = db.collection('bus');
var weekend = db.collection('weekend');
var weekday = db.collection('weekday');
var check = 0;
var station = 0;

function sleep(ms) {
  return new Promise(resolve=>setTimeout(resolve, ms));
}

(async function() {
  await sleep(1000);
})();


출처: https://jam-ws.tistory.com/29 [쨈의 작업공간]


/*function bus_table(time){
    var result = '';
    for(var i=0; i<time.length; i++){
        if(i == time.length - 1){
            result = result.concat(time[i]);
        }
        else{
            result = result.concat(time[i]+'\n');
        }
    }
    return result;
}*/
var kkk = new Array();
var bus_time = 0;

/*
function logStuff (userData) {
    if ( typeof userData === "string") {
        console.log(userData);
    }
    else if ( typeof userData === "object") {
        for (var item in userData) { console.log(item + ": " + userData[item]);
        }
    }
}
// 두 개의 인자를 받아서 마지막에 콜백함수를 호출한다.
function getInput (options, callback) {
    allUserData.push (options);
    callback (options);
}

getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);*/

function bus_table(time, callback){
    return callback(time);
}

function db_fetch(time){
    var result = '';
    bus_time = time;
    if(time.length > 1){
        weekday.distinct("bus_"+time, (function (err, docs) {
            console.log('== Find ALL, toArray');
            console.log(docs);
            kkk = docs;
            })
        );
    }
    else {
        weekday.distinct("bus_0"+time, (function (err, docs) {
            console.log('== Find ALL, toArray');
            console.log(docs);
            kkk = docs;
            })
        );
    }
    for(var i=0; i<kkk.length; i++){
        if(i == kkk.length - 1){
            result = result.concat(kkk[i]);
        }
        else{
            result = result.concat(kkk[i]+'\n');
        }
    }
    //console.log('bus_time : '+bus_time)
    //console.log('결과 : '+kkk)
    (async function() {
        await sleep(1000);
    })();
    return result;
}

function add(a,b,callback){
    var result = a + b;
    var cnt = 0;
        callback(result);
    var history = function(){
        cnt ++;
        return a + '+' + b + ' = ' + result;
    }
    return history;
};

var add_history = add(10,10,function(result){
    console.log('파라미터로 전달된 콜백함수 호출됨');
    console.log('더하기 (10,10)의 결과 : %d',result);
});

console.log('결과 값으로 받은 함수 실행 결과' + add_history());

function bus_table2(time){
    var result = '';
    weekday.distinct("bus_"+time, (function (err, docs) {
        kkk = docs;
        })
    );
    console.log('kkk값 : '+kkk)
    for(var i=0; i<kkk.length; i++) {
        if (i == kkk.length - 1) {
            result = result.concat(kkk[i]);
        }
        else {
            result = result.concat(kkk[i] + '\n');
        }
    }
    return result;
}

router.post('/', function (req, res) {
    var msg = req.body.content;
    console.log('전달받은 메시지 : ' + msg);
    var data = {};

    switch (msg) {
        case '도움말':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['도움말', '평일', '일요일']
                },
                'message': {
                    'text': '안녕하세요 버스 챗봇입니다. 홍익대학교 버스는 평일과 일요일에 운영되며, 토요일에는 운영되지 않습니다.'
                }
            }
            break;

        case '평일':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '평일'
                }
            }
            break;

        case '일요일':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '일요일이야'
                }
            }
            break;

        case '학교정문 -> 조치원역':
            check = 1;      // check = 1일 때 시간 알려주는 기능 --> "정문 -> 역" 가는 뒤로
            station = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                },
                'message': {
                    'text': '[학교정문 -> 조치원역] 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '조치원역 -> 학교정문':
            check = 1;
            station = 1;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                },
                'message': {
                    'text': '[조치원역 -> 학교정문] 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '08시~11시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                },
                'message': {
                    'text': '08시~11시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '12시~15시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                },
                'message': {
                    'text': '12시~15시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '16시~19시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                },
                'message': {
                    'text': '16시~19시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '20시~22시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['20시', '21시', '22시', '뒤로']
                },
                'message': {
                    'text': '20시~22시 시간표를 선택하셨습니다.'
                }
            }
            break;


        case '08시':
            if(station == 0){       // 학교 정문 -> 조치원역
                //console.log('kkk값 얼마냐 : '+kkk);
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_table("08", db_fetch)
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '09시':
            if(station == 0){       // 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_table("09", db_fetch)
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '10시':
            if(station == 0){       // 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_table("10", db_fetch)
                        //'text': db_fetch("10")
                        //'text': db_fetch("10")
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '11시':
            if(station == 0){       // 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_table("11", db_fetch)
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '13시':
            if(station == 0){       // 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_table("13", db_fetch)
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '뒤로':
            if (check == 0) {   // check = 0일 때 "학교정문 -> 조치원역" --> "평일" 뒤로
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['도움말', '평일', '일요일']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }

            else if (check == 1) {      // check = 1일 때 "08시~11시" --> "학교정문 -> 조치원역" 뒤로
                check = 0;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }

            else if (check == 2) {      // check = 2일 때 "08시" --> "08시~11시" 뒤로
                check = 1;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }
    }
    res.json(data);
});

/*

router.post('/', function (req, res) {
    var msg = req.body.content;
    console.log('전달받은 메시지 : ' + msg);
    var data = {};

    switch (msg) {
        case '도움말':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['도움말', '평일', '일요일']
                },
                'message': {
                    'text': '안녕하세요 버스 챗봇입니다. 홍익대학교 버스는 평일과 일요일에 운영되며, 토요일에는 운영되지 않습니다.'
                }
            }
            break;

        case '평일':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '평일'
                }
            }
            break;

        case '일요일':
            check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '일요일이야'
                }
            }
            break;

        case '학교정문 -> 조치원역':
            check = 1;      // check = 1일 때 시간 알려주는 기능 --> "정문 -> 역" 가는 뒤로
            station = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                },
                'message': {
                    'text': '[학교정문 -> 조치원역] 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '조치원역 -> 학교정문':
            check = 1;
            station = 1;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                },
                'message': {
                    'text': '[조치원역 -> 학교정문] 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '08시~11시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                },
                'message': {
                    'text': '08시~11시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '12시~15시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                },
                'message': {
                    'text': '12시~15시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '16시~19시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                },
                'message': {
                    'text': '16시~19시 시간표를 선택하셨습니다.'
                }
            }
            break;

        case '20시~22시':
            check = 2;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['20시', '21시', '22시', '뒤로']
                },
                'message': {
                    'text': '20시~22시 시간표를 선택하셨습니다.'
                }
            }
            break;


        case '08시':
            if(station == 0){       // 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': kkk
                    }
                }
            }
            else if(station == 1){          // 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일이야'
                    }
                }
            }
            break;

        case '뒤로':
            if (check == 0) {   // check = 0일 때 "학교정문 -> 조치원역" --> "평일" 뒤로
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['도움말', '평일', '일요일']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }

            else if (check == 1) {      // check = 1일 때 "08시~11시" --> "학교정문 -> 조치원역" 뒤로
                check = 0;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }

            else if (check == 2) {      // check = 2일 때 "08시" --> "08시~11시" 뒤로
                check = 1;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '이전으로 돌아갑니다.'
                    }
                }
                break;
            }
    }
    res.json(data);
});
*/
module.exports = router;