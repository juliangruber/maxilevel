
# maxilevel

  (WIP) A LevelDB hosting service using multilevel

## Example

```js
var Maxilevel = require('maxilevel');
var m = Maxilevel(__dirname + '/dbs');
var connect = require('multilevel-connect');

m.get('foo', function(err, port){
  if (err) throw err;
  var db = connect(port);

  db.get('foo', function(err, val){
    if (err) throw err;

    console.log('foo => %s', val);

    db.close();
    m.close('foo');
  });
});
```

## Installation

```bash
$ npm install maxilevel
```

## API

### Maxilevel(dir)
### #get(id, fn)
### #close(id)

## License

  MIT

