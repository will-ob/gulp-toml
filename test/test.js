'use strict';

var assert = require('assert'),
    File   = require('vinyl'),
    gtoml  = require('../index'),
    fs     = require('fs'),
    path   = require('path');;

it('should jsonify the toml', function (cb) {

  var stream = gtoml({
    to: JSON.stringify,
    ext: '.json'
  });

  stream.on('data', function (file) {
    assert.equal(file.relative, 'example.json');
    assert.equal(file.path, path.normalize('test/fixture/example.json'));
    assert.equal(file.contents.toString().trim(), fs.readFileSync('./test/fixture/example.json', 'utf8').trim());
    cb();
  });

  stream.write(new File({
    cwd: './test',
    base: './test/fixture',
    path: './test/fixture/example.toml',
    contents: fs.readFileSync('./test/fixture/example.toml')
  }));

  stream.end();
});

it('should include error details', function (cb) {

  var stream = gtoml({
    to: JSON.stringify,
    ext: '.json'
  });

  stream.on('error', function(err){
    assert.ok(err.message  != null);
    assert.ok(err.expected != null);
    assert.ok(err.found    != null);
    assert.ok(err.offset   != null);
    assert.ok(err.line     != null);
    assert.ok(err.column   != null);

    cb();
  })

  stream.write(new File({
    cwd: './test',
    base: './test/fixture',
    path: './test/fixture/error.toml',
    contents: fs.readFileSync('./test/fixture/error.toml')
  }));

  stream.end();
});

