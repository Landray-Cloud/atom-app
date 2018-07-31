const cooking = require('cooking')

let Components = require('./components.json')

cooking.set({
	entry: Components,
	dist: './dist',
	clean: true,
	format: 'umd',
	extends: ['vue2'],
	minimize: true,
  urlLoaderLimit: 80000
})

cooking.add('output.filename', '[name].js')
cooking.add('vue.preserveWhitespace', true)

module.exports = cooking.resolve()
