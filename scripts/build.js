const path = require('path');
const fs = require('fs-extra');
const { rollup } = require('rollup');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');

const { babel } = require('@rollup/plugin-babel');
const { minify } = require('terser');
const pkg = require('../package.json');

const outDir = process.env.NODE_ENV === 'production' ? 'package' : 'build';

const date = {
  day: new Date().getDate(),
  month:
    'January February March April May June July August September October November December'.split(
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

async function buildUMD() {
  const bundle = await rollup({
    input: path.resolve(__dirname, '../src/dom7.bundle.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
  });
  const { output } = await bundle.write({
    strict: true,
    name: 'Dom7',
    format: 'umd',
    file: path.resolve(__dirname, `../${outDir}/dom7.js`),
    sourcemap: true,
    banner,
  });
  const result = output[0];
  const { code, map } = await minify(result.code, {
    sourceMap: {
      content: result.map,
      filename: `dom7.min.js`,
      url: `dom7.min.js.map`,
    },
    output: {
      preamble: banner,
    },
  });
  await Promise.all([
    fs.writeFile(path.resolve(__dirname, `../${outDir}/dom7.min.js`), code),
    fs.writeFile(path.resolve(__dirname, `../${outDir}/dom7.min.js.map`), map),
  ]);
}

async function buildESM() {
  const bundle = await rollup({
    input: path.resolve(__dirname, '../src/dom7.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    external: ['ssr-window'],
    onwarn() {
      // eslint-disable-next-line
      return;
    },
  });
  await bundle.write({
    strict: true,
    format: 'esm',
    file: path.resolve(__dirname, `../${outDir}/dom7.esm.js`),
    sourcemap: false,
    banner,
  });
}

async function copyDts() {
  await fs.copyFile(
    path.resolve(__dirname, '../src/dom7.d.ts'),
    path.resolve(__dirname, '../package/dom7.d.ts'),
  );
}

try {
  buildUMD();
  buildESM();
  copyDts();
} catch (err) {
  console.log(err);
}
