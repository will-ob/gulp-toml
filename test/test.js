'use strict';

var assert = require('assert'),
    gutil  = require('gulp-util'),
    gtoml  = require('../index'),
    fs     = require('fs');

it('should jsonify the toml', function (cb) {

  var stream = gtoml({
    to: JSON.stringify,
    ext: '.json'
  });

  stream.on('data', function (file) {
    assert.equal(file.relative, 'example.json');
    assert.equal(file.path, 'test/fixture/example.json');
    assert.equal(file.contents.toString().trim(), fs.readFileSync('./test/fixture/example.json', 'utf8').trim());
    cb();
  });

  stream.write(new gutil.File({
    cwd: './test',
    base: './test/fixture',
    path: './test/fixture/example.toml',
    contents: fs.readFileSync('./test/fixture/example.toml')
  }));

  stream.end();
});

