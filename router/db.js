var mongoose = require('mongoose');
var url = 'mongodb://db:27017/bus';
mongoose.connect(url);
var db = mongoose.connection;
var bus = db.collection('weekday');



db.on('error', function(err) {
   console.log('Error : ', err);
});

db.on('open', function() {
   console.log('Open Event');
   /*bus.find({ bus_08: 'hi'}, {_id:0, bus_08:1}).toArray(function (err, docs) {
   console.log('== Find ALL, toArray');
   console.log(docs);
   });*/
   /*bus.distinct("bus_08", { bus_08: 'hi'}, (function (err, docs) {
      console.log('== Find ALL, toArray');
      console.log(String(docs));
      })
   );
   */
   bus.distinct("bus_13", (function (err, docs) {
      console.log('== Find ALL, toArray');
      console.log(docs);
      })
   );

   /*
   bus.insert({ bus_08:'hi'}).then(function(results) {
     // console.log('== Resolved\n', results);
     console.log('Insert Result : ', results);
  }, function(err) {
     console.log('== Rejected\n', err);
  });*/


});

