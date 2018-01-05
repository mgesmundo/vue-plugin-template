const babel = require('rollup-plugin-babel')
const vue = require('rollup-plugin-vue')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const minify = require('uglify-es').minify
const sass = require('rollup-plugin-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const meta = require('../package.json')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const config = {
  input: 'src/index.js',
  plugins: [
    resolve({
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    sass({
      output: process.env.BUILD === 'prod' ? `dist/${meta.name}.css` : false,
      processor: css => postcss([ autoprefixer ])
        .process(css, { from: undefined })
        .then(result => result.css)
    }),
    vue({
      css: process.env.BUILD === 'prod' ? `dist/${meta.name}.vue.css` : false,
      postcss: {
        plugins: [ autoprefixer() ],
        options: { from: undefined }
      }
    })
  ],
  output: {
    name: 'Lib',
    banner: `/*!
 * ${meta.name} v${meta.version}
 * ${meta.description}
 * ${meta.homepage ? meta.homepage : ''}
 *
 * @license
 * Copyright (c) 2017-2018 ${meta.author}
 * Released under the ${meta.license} license
 * ${meta.homepage ? meta.homepage + '/blob/master/LICENSE' : ''}
 */`
  }
}

switch (process.env.BUILD) {
  case 'es':
    config.output.format = 'es'
    config.output.file = `dist/${meta.name}.es.js`
    break
  case 'cjs':
    config.output.format = 'cjs'
    config.output.file = `dist/${meta.name}.cjs.js`
    config.plugins.push(
      babel({ exclude: 'node_modules/**' })
    )
    break
  case 'prod':
    config.output.format = 'umd'
    config.output.file = `dist/${meta.name}.min.js`
    config.plugins.push(
      babel({ exclude: 'node_modules/**' })
    )
    config.plugins.push(
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
    )
    config.plugins.push(
      uglify({
        output: {
          comments: function (node, comment) {
            var text = comment.value
            var type = comment.type
            if (type === 'comment2') {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text)
            }
          }
        }
      }, minify)
    )
    break
  case 'dev':
  default:
    config.output.format = 'umd'
    config.output.file = `dist/${meta.name}.js`
    config.plugins.push(
      babel({ exclude: 'node_modules/**' })
    )
    config.plugins.push(
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    )
}

module.exports = config