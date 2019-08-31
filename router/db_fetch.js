const request = require('request');
const cheerio = require('cheerio');
const url = "http://sejong.hongik.ac.kr/front/cmscommonview.do?pkid=1";
var express = require('express');
var mongoose = require('mongoose');
var mongodb_url = 'mongodb://db:27017/bus';
mongoose.connect(mongodb_url);
var db = mongoose.connection;
var univ_weekend = db.collection('university_weekend');
var stat_weekend = db.collection('station_weekend');
var univ_weekday = db.collection('university_weekday');
var stat_weekday = db.collection('station_weekday');

var bus_time = {};

bus_time.fetch = function() {
    request(url, (error, response, body) => {
        if (error) throw error;
        let $ = cheerio.load(body);
        try {
            /*  평일 버스 시간표  */
            for (var i = 1; i <= 5; i++) {
                if (i !== 3) {       // i = 3인 경우는 버스 시간이 아닌 '회차'를 불러옴
                    $($("table")[0]).find('tr').each(function (index, elem) {
                        if (index > 0 && index <= 26) {     // 평일 버스 시간표 세로 갯수 = 26
                            if (i >= 4 && (index == 1 || index == 18 || index == 21 || index == 22 || index == 23 || index == 25)) {
                                var bus_time = $(this).find('td').eq(i+1).text();     // 홈페이지를 보면 저 index값들에는 td가 하나씩 더 있음
                            }
                            else {
                                var bus_time = $(this).find('td').eq(i).text();     // .text() 대신 html()이면 <br>태그도 다 나옴
                            }

                            var bus_time_hour = bus_time.substring(0, 2);   // 시(hour)로 구분하기 위하여 시(hour)만 나오게끔 자름

                            if (i == 1 || i == 4) {
                                var location_week = univ_weekday;   // [학교정문 -> 조치원역]
                            }
                            else {
                                var location_week = stat_weekday;   // [조치원역 -> 학교정문]
                            }

                            setTimeout(function() {         // db에 index 순서대로 집어넣어야 되는데 비동기로 처리되다보니 순서 무시하고 저장돼서 순서대로 저장되도록 index마다 index*10(ms)만큼 이후에 실행되도록 함
                                if (bus_time == null) {
                                    return false        // for문의 break 개념
                                }
                                else {
                                    if (bus_time_hour == "-") {
                                        return true     // for문의 continue 개념
                                    }
                                    // 따로 mongodb를 create하지 않아도 그냥 insert하면 저절로 db가 create됨
                                    if (bus_time_hour == "08") {
                                        location_week.insert({bus_08: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "09") {
                                        location_week.insert({bus_09: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "10") {
                                        location_week.insert({bus_10: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "11") {
                                        location_week.insert({bus_11: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "12") {
                                        location_week.insert({bus_12: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "13") {
                                        location_week.insert({bus_13: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "14") {
                                        location_week.insert({bus_14: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "15") {
                                        location_week.insert({bus_15: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "16") {
                                        location_week.insert({bus_16: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "17") {
                                        location_week.insert({bus_17: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "18") {
                                        location_week.insert({bus_18: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "19") {
                                        location_week.insert({bus_19: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "20") {
                                        location_week.insert({bus_20: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "21") {
                                        location_week.insert({bus_21: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                    else if (bus_time_hour == "22") {
                                        location_week.insert({bus_22: bus_time}).then(function (results) {
                                            console.log('Promise Based Insert Result(resolved) : ', results);
                                        }, function (err) {
                                            console.log('Error(rejected) : ', err);
                                        });
                                    }
                                }
                            }, index*10)
                        }
                    })
                }
            }

            /*  일요일 버스 시간표  */
            for (var i = 1; i <= 5; i++) {
                if (i !== 3) {       // i = 3인 경우는 버스 시간이 아닌 '회차'를 불러옴
                    $($("table")[1]).find('tr').each(function (index, elem) {
                        if (index > 0 && index <= 5) {      // 일요일 버스 시간표 세로 갯수 = 5
                            var bus_time = $(this).find('td').eq(i).text();     // .text() 대신 html()이면 <br>태그도 다 나옴
                            var bus_time_hour = bus_time.substring(0, 2);       // 시(hour)로 구분하기 위하여 시(hour)만 나오게끔 자름

                            if (i == 1 || i == 4) {
                                var location_week = univ_weekend;       // [학교정문 -> 조치원역]
                            }
                            else {
                                var location_week = stat_weekend;       // [조치원역 -> 학교정문]
                            }

                            if (bus_time == null) {
                                return false        // for문의 break 개념
                            }
                            else {
                                if (bus_time_hour == "-") {
                                    return true     // for문의 continue 개념
                                }
                                if (bus_time_hour == "08") {
                                    location_week.insert({bus_08: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "09") {
                                    location_week.insert({bus_09: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "10") {
                                    location_week.insert({bus_10: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "11") {
                                    location_week.insert({bus_11: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "12") {
                                    location_week.insert({bus_12: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "13") {
                                    location_week.insert({bus_13: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "14") {
                                    location_week.insert({bus_14: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "15") {
                                    location_week.insert({bus_15: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "16") {
                                    location_week.insert({bus_16: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "17") {
                                    location_week.insert({bus_17: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "18") {
                                    location_week.insert({bus_18: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "19") {
                                    location_week.insert({bus_19: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "20") {
                                    location_week.insert({bus_20: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "21") {
                                    location_week.insert({bus_21: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                                else if (bus_time_hour == "22") {
                                    location_week.insert({bus_22: bus_time}).then(function (results) {
                                        console.log('Promise Based Insert Result(resolved) : ', results);
                                    }, function (err) {
                                        console.log('Error(rejected) : ', err);
                                    });
                                }
                            }
                        }
                    })
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}
module.exports = bus_time;
