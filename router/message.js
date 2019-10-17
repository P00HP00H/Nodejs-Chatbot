var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = 'mongodb://db:27017/bus';
mongoose.connect(url);
var db = mongoose.connection;
var univ_weekday = db.collection('university_weekday');   // 평일 [학교정문 -> 조치원역] 시간표
var stat_weekday = db.collection('station_weekday');      // 평일 [조치원역 -> 학교정문] 시간표
var univ_weekend = db.collection('university_weekend');   // 일요일 [학교정문 -> 조치원역] 시간표
var stat_weekend = db.collection('station_weekend');      // 일요일 [조치원역 -> 학교정문] 시간표
var bus_time_array_Router = require('./bus_time_array');      // bus_crawling 모듈을 불러옴

var button_check = 0;
var sunday_check = 0;
var station_check = 0;
var array_check = 0;

router.post('/', function (req, res) {
    var msg = req.body.content;
    var data = {};
    console.log('전달받은 메시지 : ' + msg);
    if(array_check == 0){       // 맨 처음 버튼을 누른 경우 딱 한 번 실행
        array_check++;
        bus_time_array_Router.insert1(univ_weekday);      // bus_crawling 모듈의 함수 실행
        bus_time_array_Router.insert1(stat_weekday);
        bus_time_array_Router.insert1(univ_weekend);
        bus_time_array_Router.insert1(stat_weekend);
    }

    switch (msg) {
        case '도움말':
            button_check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['도움말', '평일', '일요일']
                },
                'message': {
                    'text': '안녕하세요!! 홍익대학교 세종캠퍼스 버스 챗봇입니다. 이 챗봇은 버스 시간표를 제공해주며 해당 응답은 홈페이지의 시간표를 기준으로 제작되었습니다.\n\n1. 버스는 평일(월~금)과 일요일에 운영되며, 토요일에는 운영되지 않습니다.\n\n2. 각 시간표는 [학교정문 -> 조치원역], [조치원역 -> 학교정문]으로 나뉘어져 있습니다.\n\n3. 어떤 시간표는 순서대로 나열되어 있지 않은데, 시간표 자체는 모두 나오므로 그냥 사용하시면 됩니다.'
                }
            }
            break;

        case '평일':
            button_check = 0;
            sunday_check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '평일을 선택하셨습니다.'
                }
            }
            break;

        case '일요일':
            sunday_check = 1;
            button_check = 0;
            data = {
                'keyboard': {
                    'type': 'buttons',
                    'buttons': ['학교정문 -> 조치원역', '조치원역 -> 학교정문', '뒤로']
                },
                'message': {
                    'text': '일요일을 선택하셨습니다.'
                }
            }
            break;

        case '학교정문 -> 조치원역':
            button_check = 1;      // check = 1일 때 시간 알려주는 기능 --> "정문 -> 역" 가는 뒤로
            station_check = 0;
            if(sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [학교정문 -> 조치원역] 시간표를 선택하셨습니다.'
                    }
                }
            }
            else {
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [학교정문 -> 조치원역] 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '조치원역 -> 학교정문':
            button_check = 1;
            station_check = 1;
            if(sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 시간표를 선택하셨습니다.'
                    }
                }
            }
            else {
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시~11시', '12시~15시', '16시~19시', '20시~22시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [조치원역 -> 학교정문] 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '08시~11시':
            button_check = 2;
            if(sunday_check == 1 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [학교정문 -> 조치원역] 08시~11시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 1 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 08시~11시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [학교정문 -> 조치원역] 08시~11시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 1) {
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 08시~11시 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '12시~15시':
            button_check = 2;
            if(sunday_check == 1 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [학교정문 -> 조치원역] 12시~15시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 1 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 12시~15시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [학교정문 -> 조치원역] 12시~15시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [조치원역 -> 학교정문] 12시~15시 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '16시~19시':
            button_check = 2;
            if(sunday_check == 1 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [학교정문 -> 조치원역] 16시~19시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 1 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 16시~19시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [학교정문 -> 조치원역] 16시~19시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [조치원역 -> 학교정문] 16시~19시 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '20시~22시':
            button_check = 2;
            if(sunday_check == 1 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [학교정문 -> 조치원역] 20시~22시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 1 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': '일요일 [조치원역 -> 학교정문] 20시~22시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [학교정문 -> 조치원역] 20시~22시 시간표를 선택하셨습니다.'
                    }
                }
            }
            else if(sunday_check == 0 && station_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': '평일 [조치원역 -> 학교정문] 20시~22시 시간표를 선택하셨습니다.'
                    }
                }
            }
            break;

        case '08시':
            if(station_check == 0 && sunday_check == 0){       // 평일 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[0]    // bus_time_array 모듈의 데이터 불러오기
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){          // 평일 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[0]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){       // 일요일 학교 정문 -> 조치원역
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[0]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){          // 일요일 조치원역 -> 학교 정문
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[0]
                    }
                }
            }
            break;

        case '09시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[1]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[1]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[1]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[1]
                    }
                }
            }
            break;

        case '10시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[2]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[2]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[2]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[2]
                    }
                }
            }
            break;

        case '11시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[3]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[3]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[3]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['08시', '09시', '10시', '11시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[3]
                    }
                }
            }
            break;

        case '12시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[4]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[4]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[4]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[4]
                    }
                }
            }
            break;

        case '13시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[5]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[5]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[5]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[5]
                    }
                }
            }
            break;

        case '14시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[6]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[6]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[6]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[6]
                    }
                }
            }
            break;

        case '15시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[7]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[7]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[7]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['12시', '13시', '14시', '15시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[7]
                    }
                }
            }
            break;

        case '16시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[8]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[8]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[8]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[8]
                    }
                }
            }
            break;

        case '17시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[9]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[9]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[9]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[9]
                    }
                }
            }
            break;

        case '18시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[10]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[10]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[10]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[10]
                    }
                }
            }
            break;

        case '19시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[11]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[11]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[11]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['16시', '17시', '18시', '19시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[11]
                    }
                }
            }
            break;

        case '20시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[12]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[12]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[12]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[12]
                    }
                }
            }
            break;

        case '21시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[13]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[13]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[13]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[13]
                    }
                }
            }
            break;

        case '22시':
            if(station_check == 0 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekday_bus_time[14]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 0){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekday_bus_time[14]
                    }
                }
            }
            else if(station_check == 0 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.univ_weekend_bus_time[14]
                    }
                }
            }
            else if(station_check == 1 && sunday_check == 1){
                data = {
                    'keyboard': {
                        'type': 'buttons',
                        'buttons': ['20시', '21시', '22시', '뒤로']
                    },
                    'message': {
                        'text': bus_time_array_Router.stat_weekend_bus_time[14]
                    }
                }
            }
            break;

        case '뒤로':
            if (button_check == 0) {   // check = 0일 때 "학교정문 -> 조치원역" --> "평일" 뒤로
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

            else if (button_check == 1) {      // check = 1일 때 "08시~11시" --> "학교정문 -> 조치원역" 뒤로
                button_check = 0;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
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

            else if (button_check == 2) {      // check = 2일 때 "08시" --> "08시~11시" 뒤로
                button_check = 1;      // 메뉴에 맞는 '뒤로'가 처리되도록 함
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
module.exports = router;
