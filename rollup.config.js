const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')
const virtual = require('rollup-plugin-virtual')

const pkg = require('./package.json')

const isPolyfill = process.env.TARGET === 'polyfill'

module.exports = {
  input: 'src/index.js',
  name: 'inViewportMixin',
  output: {
    file: (isPolyfill 
      ? pkg.main.replace('.', '.polyfill.')
      : pkg.main
    ),
    format: 'umd'
  },
  useStrict: false,
  plugins: [
    (isPolyfill 
      ? {}
      : virtual({ 'intersection-observer': 'export default \'noop\'' })
    ),
    babel(), 
    resolve(), 
    buble()
  ]
}