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

/* 평일 버스 시간표 */
function bus_time_weekday(num){
    console.log('평일 버스 시간표 : '+num);
    request(url, (error, response, body) => {
        if (error) throw error;
        let $ = cheerio.load(body);
        try {
            return new Promise((resolve, reject) => {
                setTimeout(function() {     /* db에 각 시간표 줄을 순서대로 집어넣어야 되는데 비동기로 처리되다보니 Promise로 인해 시작 순서는 맞게 되지만(await 함수 순서대로 실행)
                데이터 저장 시 순서를 무시하고 저장되는 경우가 있어서 순서대로 저장되도록 함수가 num번째 실행될 때마다 300*(num-1)(ms)만큼 이후에 종료되도록 함
                -> db에 데이터가 저장된 후 Promise를 return 하는 것이 아니라 db에 저장이 될 때까지 기다리지 않고 코드가 다 수행되면 먼저 return함 */
                    $($("table")[0]).find('tr').each(function (index, elem) {
                        if (index > 0 && index <= 26) {
                            if (num >= 4 && (index == 1 || index == 18 || index == 21 || index == 22 || index == 23 || index == 25)) {
                                var bus_time = $(this).find('td').eq(num + 1).text();     // 홈페이지를 보면 저 index값(1, 18, 21, 22, 23, 25)들에는 td가 하나씩 더 있음
                            } else {
                                var bus_time = $(this).find('td').eq(num).text();       // .text() 대신 html()이면 <br>태그도 다 나옴
                            }
                            var bus_time_hour = bus_time.substring(0, 2);
                            if (num == 1 || num == 4) {
                                var location_week = univ_weekday;       // [학교정문 -> 조치원역]
                            } else {
                                var location_week = stat_weekday;       // [조치원역 -> 학교정문]
                            }
                            setTimeout(function () {    /* db에 index 순서대로 집어넣어야 되는데 비동기로 처리되다보니 순서 무시하고 저장돼서
                            순서대로 저장되도록 index마다 index*10(ms)만큼 이후에 실행되도록 함 -> 시간표가 같은 줄에 있는 경우를 의미*/
                                if (bus_time == null) {
                                    return false        // for문의 break 개념
                                } else {
                                    if (bus_time_hour == "-") {
                                        return true     // for문의 continue 개념
                                    }
                                    // 따로 mongodb를 create하지 않아도 그냥 insert하면 저절로 db가 create됨
                                    if (bus_time_hour == "08") {
                                        location_week.insert({bus_08: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "09") {
                                        location_week.insert({bus_09: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "10") {
                                        location_week.insert({bus_10: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "11") {
                                        location_week.insert({bus_11: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "12") {
                                        location_week.insert({bus_12: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "13") {
                                        location_week.insert({bus_13: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "14") {
                                        location_week.insert({bus_14: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "15") {
                                        location_week.insert({bus_15: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "16") {
                                        location_week.insert({bus_16: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "17") {
                                        location_week.insert({bus_17: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "18") {
                                        location_week.insert({bus_18: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "19") {
                                        location_week.insert({bus_19: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "20") {
                                        location_week.insert({bus_20: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "21") {
                                        location_week.insert({bus_21: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    } else if (bus_time_hour == "22") {
                                        location_week.insert({bus_22: bus_time}).then(function (results) {
                                            resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                        }, function (err) {
                                            reject(console.log('Error(rejected) : ', err));
                                        });
                                    }
                                }
                            }, index * 30)
                        }
                    })
                }, 300*(num-1))
            })
        } catch (error) {
            console.error(error);
        }
    })
}

/* 일요일 버스 시간표 */
function bus_time_weekend(num){
    console.log('일요일 버스 시간표 : '+num);
    request(url, (error, response, body) => {
        if (error) throw error;
        let $ = cheerio.load(body);
        try {
            return new Promise((resolve, reject) => {
                setTimeout(function() {     /* db에 각 시간표 줄을 순서대로 집어넣어야 되는데 비동기로 처리되다보니 Promise로 인해 시작 순서는 맞게 되지만(await 함수 순서대로 실행)
                데이터 저장 시 순서를 무시하고 저장되는 경우가 있어서 순서대로 저장되도록 함수가 num번째 실행될 때마다 300*(num-1)(ms)만큼 이후에 종료되도록 함
                -> db에 데이터가 저장된 후 Promise를 return 하는 것이 아니라 db에 저장이 될 때까지 기다리지 않고 코드가 다 수행되면 먼저 return함 */
                    $($("table")[1]).find('tr').each(function (index, elem) {
                        if (index > 0 && index <= 5) {
                            var bus_time = $(this).find('td').eq(num).text();   // .text() 대신 html()이면 <br>태그도 다 나옴
                            var bus_time_hour = bus_time.substring(0, 2);       // 시(hour)로 구분하기 위하여 시(hour)만 나오게끔 자름

                            if (num == 1 || num == 4) {
                                var location_week = univ_weekend;       // [학교정문 -> 조치원역]
                            } else {
                                var location_week = stat_weekend;       // [조치원역 -> 학교정문]
                            }
                            if (bus_time == null) {
                                return false        // for문의 break 개념
                            } else {
                                if (bus_time_hour == "-") {
                                    return true     // for문의 continue 개념
                                }
                                // 따로 mongodb를 create하지 않아도 그냥 insert하면 저절로 db가 create됨
                                if (bus_time_hour == "08") {
                                    location_week.insert({bus_08: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "09") {
                                    location_week.insert({bus_09: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "10") {
                                    location_week.insert({bus_10: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "11") {
                                    location_week.insert({bus_11: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "12") {
                                    location_week.insert({bus_12: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "13") {
                                    location_week.insert({bus_13: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "14") {
                                    location_week.insert({bus_14: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "15") {
                                    location_week.insert({bus_15: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "16") {
                                    location_week.insert({bus_16: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "17") {
                                    location_week.insert({bus_17: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "18") {
                                    location_week.insert({bus_18: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "19") {
                                    location_week.insert({bus_19: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "20") {
                                    location_week.insert({bus_20: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "21") {
                                    location_week.insert({bus_21: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                } else if (bus_time_hour == "22") {
                                    location_week.insert({bus_22: bus_time}).then(function (results) {
                                        resolve(console.log('Promise Based Insert Result(resolved) : ', results));
                                    }, function (err) {
                                        reject(console.log('Error(rejected) : ', err));
                                    });
                                }
                            }
                        }
                    })
                }, 300*(num-1))
            })
        } catch (error) {
            console.error(error);
        }
    })
}

async function db_bus_time_weekday() {
    const bus_time_weekday1 = await bus_time_weekday(1)     // 각 함수들이 Promise를 리턴함으로써 await가 순서대로 실행됨
    const bus_time_weekday2 = await bus_time_weekday(2)
    const bus_time_weekday3 = await bus_time_weekday(4)     // 매개변수가 3인 경우는 버스 시간이 아닌 '회차'를 불러옴
    const bus_time_weekday4 = await bus_time_weekday(5)
}
async function db_bus_time_weekend() {
    const bus_time_weekend1 = await bus_time_weekend(1)     // 각 함수들이 Promise를 리턴함으로써 await가 순서대로 실행됨
    const bus_time_weekend2 = await bus_time_weekend(2)
    const bus_time_weekend3 = await bus_time_weekend(4)     // 매개변수가 3인 경우는 버스 시간이 아닌 '회차'를 불러옴
    const bus_time_weekend4 = await bus_time_weekend(5)
}

bus_time.insert = function() {
    db_bus_time_weekday();
    db_bus_time_weekend();
}
module.exports = bus_time;
