var spawn = require('child_process').spawn;
var assert = require('assert');
var join = require('path').join;
var debug = require('debug')('maxilevel');

var sandbox = require.resolve('level-sandbox');

module.exports = Maxilevel;

function Maxilevel(dir){
  assert(dir, 'directory required');
  if (!(this instanceof Maxilevel)) return new Maxilevel(dir);
  this._dir = dir;
  this._ps = {};
}

Maxilevel.prototype.get = function(id, fn){
  var self = this;
  debug('get %s', id);

  // TODO mutex
  if (this._ps[id]) {
    debug('exists %s', id);
    return setImmediate(fn.bind(null, null, this._ps[id].port));
  }

  debug('spawn %s', id);
  var ps = spawn(sandbox, [
    '--port=random',
    join(this._dir, id)
  ]);
  ps.stdout.once('data', function(line){
    var port = /(\d+)/.exec(line.toString())[0];
    debug('port %s for %s', port, id);
    self._ps[id] = { port: port, ps: ps };
    fn(null, port);
  });
  ps.stderr.on('data', console.error.bind(console, '%s'));
};

Maxilevel.prototype.close = function(id){
  this._ps[id].ps.kill();
};
