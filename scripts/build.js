const path = require('path');
const fs = require('fs');
const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const { babel } = require('@rollup/plugin-babel');
const { minify } = require('terser');
const pkg = require('../package.json');

const outDir = process.env.NODE_ENV === 'production' ? 'package' : 'build';

const date = {
  day: new Date().getDate(),
  month: 'January February March April May June July August September October November December'.split(
    ' ',
  )[new Date().getMonth()],
  year: new Date().getFullYear(),
};

const version = process.env.VERSION || pkg.version;

const banner = `
/**
 * Dom7 ${version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright ${date.year}, ${pkg.author}
 *
 * Licensed under ${pkg.license}
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim();

function buildUMD() {
  rollup({
    input: path.resolve(__dirname, '../src/dom7.bundle.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
  })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        name: 'Dom7',
        format: 'umd',
        file: path.resolve(__dirname, `../${outDir}/dom7.js`),
        sourcemap: false,
        banner,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];
      const minified = await minify(result.code, {
        sourceMap: {
          content: result.map,
          filename: `dom7.min.js`,
          url: `dom7.min.js.map`,
        },
        output: {
          preamble: banner,
        },
      });
      fs.writeFileSync(
        path.resolve(__dirname, `../${outDir}/dom7.min.js`),
        minified.code,
      );
      fs.writeFileSync(
        path.resolve(__dirname, `../${outDir}/dom7.min.js.map`),
        minified.map,
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function buildESM() {
  rollup({
    input: path.resolve(__dirname, '../src/dom7.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    external: ['ssr-window'],
    onwarn() {
      // eslint-disable-next-line
      return;
    },
  })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        format: 'esm',
        file: path.resolve(__dirname, `../${outDir}/dom7.esm.js`),
        sourcemap: false,
        banner,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
function buildCJS() {
  rollup({
    input: path.resolve(__dirname, '../src/dom7.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    external: ['ssr-window'],
    onwarn() {
      // eslint-disable-next-line
      return;
    },
  })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        format: 'cjs',
        file: path.resolve(__dirname, `../${outDir}/dom7.cjs.js`),
        sourcemap: false,
        banner,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function copyDts() {
  fs.copyFileSync(
    path.resolve(__dirname, '../src/dom7.d.ts'),
    path.resolve(__dirname, '../package/dom7.d.ts'),
  );
}

buildUMD();
buildESM();
buildCJS();
copyDts();
