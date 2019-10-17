var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://db:27017/';
var mongoose = require('mongoose');
mongoose.connect(url);

var bus_time = {};

bus_time.db_delete = function() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var bus_db = db.db("bus");
        bus_db.collection("university_weekday").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("db.collection deleted");
            db.close();
        });
        bus_db.collection("university_weekend").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("db.collection deleted");
            db.close();
        });
        bus_db.collection("station_weekday").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("db.collection deleted");
            db.close();
        });
        bus_db.collection("station_weekend").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("db.collection deleted");
            db.close();
        });
    });
}
module.exports = bus_time;
