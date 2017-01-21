const buble = require('rollup-plugin-buble')
    , uglify = require('rollup-plugin-uglify')
    , eslint = require('rollup-plugin-eslint')


let config = {
    entry: 'src/index.js',
    dest: 'dist/jbit.js',
    format: 'umd',
    context: 'window',
    moduleName: 'B',
    plugins: [ buble() ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        uglify()
    )
} else {
    config.plugins.unshift(
        eslint()
    )
}

module.exports = config
