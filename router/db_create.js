var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://db:27017/';
var mongoose = require('mongoose');
mongoose.connect(url);

var bus_time = {};

bus_time.db_create = function() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var bus_db = db.db("bus");
        bus_db.createCollection("university_weekday", {capped: true, size: 5000, max: 5000}, function (err, res) {
            if (err) throw err;
            console.log("db.collection(university_weekday) created!");
            db.close();
        });
        bus_db.createCollection("university_weekend", {capped: true, size: 5000, max: 5000}, function (err, res) {
            if (err) throw err;
            console.log("db.collection(university_weekend) created!");
            db.close();
        });
        bus_db.createCollection("station_weekday", {capped: true, size: 5000, max: 5000}, function (err, res) {
            if (err) throw err;
            console.log("db.collection(station_weekday) created!");
            db.close();
        });
        bus_db.createCollection("station_weekend", {capped: true, size: 5000, max: 5000}, function (err, res) {
            if (err) throw err;
            console.log("db.collection(station_weekend) created!");
            db.close();
        });
    });
}
module.exports = bus_time;
