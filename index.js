'use strict';

var through     = require('through2'),
    toml        = require('toml'),
    PluginError = require('plugin-error');

module.exports = function(opts){
  if(opts == null){opts = {}}

  if(!opts.to ){ opts.to = JSON.stringify }
  if(!opts.ext){ opts.ext = ".json" }

  var toToml = function (file){
    file.extname = opts.ext;
    var obj = toml.parse(file.contents.toString());
    file.contents = new Buffer(opts.to(obj), 'utf8');
    return file;
  }

  return through.obj(function(file, enc, cb){
    if(file.isNull()) {
      this.push(file);
      return cb();
    }
    if(file.isStream()) {
      this.emit('error', new PluginError('gulp-toml', 'Streaming not supported'));
      return cb();
    }
    try {
      this.push(toToml(file));
    } catch(error) {
      this.emit('error', new PluginError('gulp-toml', error.message, {'error': error}));
    }
    return cb();
  });

}
