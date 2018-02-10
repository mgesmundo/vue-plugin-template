# vue-plugin-template

> ✨ DX experience & lighter plugins 🚀

Fork of https://github.com/posva/vue-plugin-template and https://github.com/eCollect/vue-plugin-template.

This is a simplified version without JSX support and with a straightforward configuration.

## Usage

```bash
vue init mgesmundo/vue-plugin-template my-awesome-plugin
# Answer some questions
cd my-awesome-plugin
npm install
npm run storybook
# 🎉
```

## Features

### Smaller plugin size
Bundle with [Rollup](https://github.com/rollup/rollup). This produces bundles
that are easier to debug and more lightweight but is less customizable than
Webpack. But don't worry **you can also use Webpack** instead of Rollup 😉

### Single file components
Write your components using `.vue` files. Those will be compiled into render
functions when building your plugin to make them compatible everywhere.

### ES6
Use the future features of Javascript.

### Advanced testing
Get the best developer experience by testing the components at the same
time you **interact** with them using [storybook](https://storybook.js.org/basics/guide-vue/).

### Development-only features
Add warnings to improve the DX of your plugin that are removed when bundling in
production mode:

```js
if (process.env.NODE_ENV !== 'production' && warningCondition) {
  warn('You should be doing things this way instead: ...')
}
```
Refer to [Dist files](#dist-files) for more information.

## FAQ

### Dist files

_Q_: **Why are there 3 different generated files for js in the `dist` folder?**

_A_: Each one serves its purpose: the non minified file (`lib.js`) replaces `process.env.NODE_ENV` by `"development"` to keep development only features like warning (pretty much like Vue warnings). The CommonJS file (`lib.cjs.js`) and/or the ES6 file (`lib.es.js`) is meant to be used with bundlers like Webpack or Rollup and keeps the variable `process.env.NODE_ENV` so it can be replaced by bundlers. The minified version (`lib.min.js`) strips off development features by replacing `process.env.NODE_ENV` by `"production"`.

_Q_: **When should I choose Rollup over Webpack for the bundler?**

_A_: If [next-css](http://cssnext.io/) isn't enough for you, it's better to use
Webpack. If a feature is missing
in [vue-rollup-plugin](https://github.com/vuejs/rollup-plugin-vue) but present
on [vue-loader](https://github.com/vuejs/vue-loader/) you can benefit from it by
using Webpack. On the other hand if you're building a simple plugin with few
components, you should use Rollup as the bundler to get more lightweight lib
sizes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for help about developing this template

## License

[MIT](http://opensource.org/licenses/MIT)
