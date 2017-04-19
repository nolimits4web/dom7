(function () {
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        header = require('gulp-header'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        rollup = require('rollup-stream'),
        buble = require('rollup-plugin-buble'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        rename = require('gulp-rename'),
        pkg = require('./package.json'),
        banner = [
            '/**',
            ' * Dom7 <%= pkg.version %>',
            ' * <%= pkg.description %>',
            ' * <%= pkg.homepage %>',
            ' * ',
            ' * Copyright <%= date.year %>, <%= pkg.author %>',
            ' * The iDangero.us',
            ' * http://www.idangero.us/',
            ' * ',
            ' * Licensed under <%= pkg.license %>',
            ' * ',
            ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
            ' */',
            ''].join('\n');

    // Build
    gulp.task('build', function (cb) {
        rollup({
            entry: './src/dom7.js',
            plugins: [buble()],
            format: 'umd',
            moduleName: 'Dom7',
            useStrict: true,
            sourceMap: true
        })
        .pipe(source('dom7.js', './src'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'))
        .on('end', function () {
            cb();
        });
    });

    // UMD DIST
    function umd(cb) {
      rollup({
          entry: './src/dom7.js',
          plugins: [buble()],
          format: 'umd',
          moduleName: 'Dom7',
          useStrict: true,
          sourceMap: true
      })
      .pipe(source('dom7.js', './src'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(header(banner, {
          pkg: pkg,
          date: (function () {
              return {
                  year: new Date().getFullYear(),
                  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                  day: new Date().getDate()
              };
          })()
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'))
      .on('end', function () {
        gulp.src('./dist/dom7.js')
          .pipe(sourcemaps.init())
          .pipe(uglify())
          .pipe(header(banner, {
            pkg: pkg,
            date: (function () {
              return {
                year: new Date().getFullYear(),
                month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                day: new Date().getDate()
              };
            })()
          }))
          .pipe(rename('dom7.min.js'))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./dist/'))
          .on('end', function () {
              if (cb) cb();
          });
      });
    }
    // ES MODULE DIST
    function es(cb) {
      rollup({
          entry: './src/dom7.js',
          plugins: [buble()],
          format: 'es',
          moduleName: 'Dom7',
          useStrict: true,
          sourceMap: true
      })
      .pipe(source('dom7.js', './src'))
      .pipe(buffer())
      .pipe(header(banner, {
          pkg: pkg,
          date: (function () {
              return {
                  year: new Date().getFullYear(),
                  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                  day: new Date().getDate()
              };
          })()
      }))
      .pipe(rename('dom7.es2015.js'))
      .pipe(gulp.dest('./dist/'))
      .on('end', function () {
        if (cb) cb();
      });
    }
    // Dist
    gulp.task('dist', function (cb) {
        var cbs = 0;
        umd(function () {
          cbs += 1;
          if (cbs === 2) cb();
        });
        es(function () {
          cbs += 1;
          if (cbs === 2) cb();
        });
    });

    gulp.task('watch', function () {
        gulp.watch('./src/*.js', ['build']);
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ './' ],
            livereload: true,
            port:'3000'
        });
    });

    gulp.task('open', function () {
        return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html'}));
    });

    gulp.task('server', [ 'watch', 'connect', 'open' ]);


})();
