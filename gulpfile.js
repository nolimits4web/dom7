const fs = require('fs');
const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const rename = require('gulp-rename');
const modifyFile = require('gulp-modify-file');
const pkg = require('./package.json');

const date = (function date() {
  return {
    year: new Date().getFullYear(),
    month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
    day: new Date().getDate(),
  };
}());
const banner = `
/**
 * Dom7 ${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright ${date.year}, ${pkg.author}
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under ${pkg.license}
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim();

// UMD DIST
function umd(cb) {
  const env = process.env.NODE_ENV || 'development';
  const output = env === 'development' ? './build' : './dist';

  rollup.rollup({
    input: './src/dom7.js',
    plugins: [resolve(), buble()],
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: `${output}/dom7.js`,
      format: 'umd',
      name: 'Dom7',
      sourcemap: env === 'development',
      sourcemapFile: `${output}/dom7.js.map`,
      banner,
    });
  }).then(() => {
    if (env === 'development') {
      if (cb) cb();
      return;
    }
    gulp.src('./dist/dom7.js')
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(rename('dom7.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'))
      .on('end', () => {
        if (cb) cb();
      });
  });
}

// ES MODULE DIST
function es(cb) {
  const env = process.env.NODE_ENV || 'development';
  const output = env === 'development' ? './build' : './dist';
  let cbs = 0;

  rollup.rollup({
    input: './src/dom7.js',
    external: ['ssr-window'],
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: `${output}/dom7.module.js`,
      format: 'es',
      name: 'Dom7',
      sourcemap: env === 'development',
      sourcemapFile: `${output}/dom7.module.js.map`,
      banner,
    });
  }).then(() => {
    cbs += 1;
    if (cb && cbs === 2) cb();
  });

  rollup.rollup({
    input: './src/dom7.modular.js',
    external: ['ssr-window'],
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: `${output}/dom7.modular.js`,
      format: 'es',
      name: 'Dom7',
      sourcemap: env === 'development',
      sourcemapFile: `${output}/dom7.modular.js.map`,
      banner,
    });
  }).then(() => {
    cbs += 1;
    if (cb && cbs === 2) cb();
  });
}

gulp.task('build', (cb) => {
  let cbs = 0;
  const env = process.env.NODE_ENV || 'development';
  const output = env === 'development' ? './build' : './dist';
  fs.copyFileSync('./src/dom7.d.ts', `${output}/dom7.d.ts`);

  umd(() => {
    cbs += 1;
    if (cbs === 2) cb();
  });
  es(() => {
    cbs += 1;
    if (cbs === 2) cb();
  });
});

gulp.task('demo', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./demo/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../dist/dom7.min.js', '../build/dom7.js');
      }
      return content
        .replace('../build/dom7.js', '../dist/dom7.min.js');
    }))
    .pipe(gulp.dest('./demo/'))
    .on('end', () => {
      if (cb) cb();
    });
});

gulp.task('watch', () => {
  gulp.watch('./src/*.js', gulp.series(['build']));
});

gulp.task('connect', () => connect.server({
  root: ['./'],
  livereload: true,
  port: '3000',
}));

gulp.task('open', () => gulp.src('./demo/index.html').pipe(open({ uri: 'http://localhost:3000/demo/index.html' })));

gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));
