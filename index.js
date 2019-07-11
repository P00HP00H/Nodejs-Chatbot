const request = require('request');
const cheerio = require('cheerio');
const url = "http://sejong.hongik.ac.kr/front/cmscommonview.do?pkid=1";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url2 = 'mongodb://db:27017/bus';
mongoose.connect(url2);
var db = mongoose.connection;
var bus = db.collection('bus');
var weekend = db.collection('weekend');
var weekday = db.collection('weekday');

request(url, (error, response, body) => {
  if (error) throw error;

  let $ = cheerio.load(body);

  try {
    let krDay = '';
    let corner = '';
    let menu = '';
    /*$('table').find('tr').each(function (index, elem) {
        if (index == 2) {
            krDay = $(this).find('td').text().trim();
            for (var i = 0; i < 6; i++) {
                krDay = $(this).find('td').eq(i).html();
                var kkk = Number(krDay.substring(0, 2));
                //console.log(`${krDay}`);
                //var kkk2 = Number(kkk);
                console.log(typeof(kkk));
            }
        }
    });*/

    $('table').find('tr').each(function (index, elem) {
        if(index > 0) {
            var bus_time = $(this).find('td').eq(1).html();
            console.log(typeof(bus_time));
            console.log(bus_time);
            var bus_time_hour = bus_time.substring(0, 2);
            console.log("버스 시간만 : "+bus_time_hour);
            if (bus_time == null) {
                return false        // for문의 break 개념
            }
            else {
                if (bus_time_hour == "-") {
                    return true     // for문의 continue 개념
                }
                if (bus_time_hour == "8") {
                    weekday.insert({bus_08: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "9") {
                    weekday.insert({bus_09: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "10") {
                    weekday.insert({bus_10: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "11") {
                    weekday.insert({bus_11: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "12") {
                    weekday.insert({bus_12: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "13") {
                    weekday.insert({bus_13: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "14") {
                    weekday.insert({bus_14: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "15") {
                    weekday.insert({bus_15: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "16") {
                    weekday.insert({bus_16: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "17") {
                    weekday.insert({bus_17: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "18") {
                    weekday.insert({bus_18: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "19") {
                    weekday.insert({bus_19: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
                else if (bus_time_hour == "20") {
                    weekday.insert({bus_20: bus_time}).then(function (results) {
                        console.log('Promise Based Insert Result : ', results);
                    }, function (err) {
                        console.log('Error : ', err);
                    });
                }
            }
        }
    });

    console.log('krDAY :'+bus_time);
    /*
    weekday.insert({bus_10:krDay}).then(function(results) {
     // console.log('== Resolved\n', results);
     console.log('Promise Based Insert Result : ', results);
  }, function(err) {
     console.log('== Rejected\n', err);
  });*/

  } catch (error) {
    console.error(error);
  }
  //console.log(body);
});