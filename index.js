'use strict';

var through  = require('through2'),
    toml     = require('toml'),
    gutil    = require('gulp-util'),
    ext      = gutil.replaceExtension;

module.exports = function(opts){
  if(opts == null){opts = {}}

  if(!opts.to ){ opts.to = JSON.stringify }
  if(!opts.ext){ opts.ext = ".json" }

  var toToml = function (file){
    file.path = ext(file.path, opts.ext);
    var obj = toml.parse(file.contents.toString());
    file.contents = new Buffer(opts.to(obj), 'utf8');
    return file
  }

  return through.obj(function(file, enc, cb){
    if(file.isNull()) {
       this.push(file);
       return cb();
    }
    if(file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-toml', 'Streaming not supported'));
      return cb();
    }
    this.emit('data', toToml(file));
    return cb();
  });

}
