gulp-toml
==============

Install
-----------

Install with [npm](https://npmjs.org/package/gulp-toml)

```javascript
npm install --save-dev gulp-toml
```

Usage
---------

```javascript
var toml = require('gulp-toml'),
    json = JSON.stringify;

gulp.task('toml', function(){

  gulp.src()
    .pipe(toml({to: json, ext: '.json'})) // defaults
    .pipe(gulp.dest('./public/'));

});

```

Thanks
-------

Thanks to [@binaryMuse](https://github.com/BinaryMuse) for [toml-node](https://github.com/BinaryMuse/toml-node). He did all the hard work.

License
--------

MIT
