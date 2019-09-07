var express = require('express');
var mongoose = require('mongoose');
var mongodb_url = 'mongodb://db:27017/bus';
mongoose.connect(mongodb_url);
var db = mongoose.connection;
var univ_weekend = db.collection('university_weekend');
var stat_weekend = db.collection('station_weekend');
var univ_weekday = db.collection('university_weekday');
var stat_weekday = db.collection('station_weekday');

var univ_weekday_bus_time = new Array();
var stat_weekday_bus_time = new Array();
var univ_weekend_bus_time = new Array();
var stat_weekend_bus_time = new Array();

var bus_time = {};

bus_time.insert1 = function(location_week) {
    // Promise를 통해 8시 시간표부터 먼저 DB에 저장해야만 9시 시간표를 저장할 수 있고,
    // 9시 시간표를 먼저 DB에 저장해야 10시 시간표를 저장할 수 있게 함 -> 이후 시간표들도 마찬가지
    bus_time.insert2(location_week, 8, bus_time.insert3)
        .then(bus_time.insert2(location_week, 9, bus_time.insert3))
        .then(bus_time.insert2(location_week, 10, bus_time.insert3))
        .then(bus_time.insert2(location_week, 11, bus_time.insert3))
        .then(bus_time.insert2(location_week, 12, bus_time.insert3))
        .then(bus_time.insert2(location_week, 13, bus_time.insert3))
        .then(bus_time.insert2(location_week, 14, bus_time.insert3))
        .then(bus_time.insert2(location_week, 15, bus_time.insert3))
        .then(bus_time.insert2(location_week, 16, bus_time.insert3))
        .then(bus_time.insert2(location_week, 17, bus_time.insert3))
        .then(bus_time.insert2(location_week, 18, bus_time.insert3))
        .then(bus_time.insert2(location_week, 19, bus_time.insert3))
        .then(bus_time.insert2(location_week, 20, bus_time.insert3))
        .then(bus_time.insert2(location_week, 21, bus_time.insert3))
        .then(bus_time.insert2(location_week, 22, bus_time.insert3));
}

bus_time.insert2 = function(location_week, num, callback) {
    if (location_week == univ_weekday) {
        var location_week_check = 0;    // location_week_check = 0 -> univ_weekday, location_week_check = 1 -> stat_weekday
    }
    else if (location_week == stat_weekday) {
        var location_week_check = 1;
    }
    else if (location_week == univ_weekend) {
        var location_week_check = 2;
    }
    else if (location_week == stat_weekend) {
        var location_week_check = 3;
    }
    return new Promise((resolve, reject) => {
        if (num < 10) {
            location_week.distinct("bus_0" + num, (function (err, docs) {
                if (err) {
                    console.log('err');
                }
                else {
                    resolve(callback(location_week_check, docs, num-8));
                }
            }));
        }
        else {
            location_week.distinct("bus_" + num, (function (err, docs) {
                if (err) {
                    console.log('err');
                }
                else {
                    resolve(callback(location_week_check, docs, num-8));
                }
            }));
        }
    });
}

bus_time.insert3 = function(check_num, res, arr_num) {
    var result = '';
    if(check_num == 0) {        // check_num = 0 -> univ_weekday
        if(res.length == 0){
            univ_weekday_bus_time[arr_num] = '버스 시간이 없습니다.';
        }
        else if (res.length == 1) {
            result = res[0];
            univ_weekday_bus_time[arr_num] = result;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                if (i == res.length - 1) {
                    result = result.concat(res[i]);
                }
                else {
                    result = result.concat(res[i] + '\n');
                }
            }
            setTimeout(function () {        // result값 처리된 후 배열에 집어넣기 위해 setTimeout 이용
                univ_weekday_bus_time[arr_num] = result;
                exports.univ_weekday_bus_time = univ_weekday_bus_time;
            }, 500);
        }
    }
    else if(check_num == 1){        // check_num = 1 -> stat_weekday
        if(res.length == 0){
            stat_weekday_bus_time[arr_num] = '버스 시간이 없습니다.';
        }
        else if (res.length == 1) {
            result = res[0];
            stat_weekday_bus_time[arr_num] = result;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                if (i == res.length - 1) {
                    result = result.concat(res[i]);
                }
                else {
                    result = result.concat(res[i] + '\n');
                }
            }
            setTimeout(function () {
                stat_weekday_bus_time[arr_num] = result;
            }, 500);
        }
    }

    else if(check_num == 2){    // check_num = 2 -> univ_weekend
        if(res.length == 0){
            univ_weekend_bus_time[arr_num] = '버스 시간이 없습니다.';
        }
        else if (res.length == 1) {
            result = res[0];
            univ_weekend_bus_time[arr_num] = result;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                if (i == res.length - 1) {
                    result = result.concat(res[i]);
                }
                else {
                    result = result.concat(res[i] + '\n');
                }
            }
            setTimeout(function () {
                univ_weekend_bus_time[arr_num] = result;
                console.log('평일 정문 시간표 : '+univ_weekend_bus_time)
            }, 500);
        }
    }

    else if(check_num == 3){    // check_num = 3 -> stat_weekend
        if(res.length == 0){
            stat_weekend_bus_time[arr_num] = '버스 시간이 없습니다.';
        }
        else if (res.length == 1) {
            result = res[0];
            stat_weekend_bus_time[arr_num] = result;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                if (i == res.length - 1) {
                    result = result.concat(res[i]);
                }
                else {
                    result = result.concat(res[i] + '\n');
                }
            }
            setTimeout(function () {
                stat_weekend_bus_time[arr_num] = result;
            }, 500);
        }
    }
}
bus_time.univ_weekday_bus_time = univ_weekday_bus_time;
bus_time.stat_weekday_bus_time = stat_weekday_bus_time;
bus_time.univ_weekend_bus_time = univ_weekend_bus_time;
bus_time.stat_weekend_bus_time = stat_weekend_bus_time;

module.exports = bus_time;