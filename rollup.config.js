import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

let config = {
    entry: 'src/jBit.js',
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
}


export default config
