(function () {
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        eslint = require('gulp-eslint'),
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
    gulp.task('dist', function (cb) {
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
            gulp.src('./dist/framework7-vue.js')
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
                    cb();
                });
        });
    });

    gulp.task('lint', function () {
        return gulp.src(['./src/*.js','!node_modules/**'])
            // eslint() attaches the lint output to the "eslint" property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
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
