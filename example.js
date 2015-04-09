var Maxilevel = require('./');
var m = Maxilevel(__dirname + '/dbs');
var connect = require('multilevel-connect');

m.get('foo', function(err, port){
  if (err) throw err;
  var db = connect(port);

  db.put('foo', 'bar', function(err){
    if (err) throw err;
    db.close();

    m.get('foo', function(err, port){
      if (err) throw err;

      db = connect(port);
      db.get('foo', function(err, val){
        if (err) throw err;

        console.log('foo => %s', val);
        db.close();
        m.close('foo');
      });
    });
  });
});
