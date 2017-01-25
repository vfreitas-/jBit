const rollup = require('./rollup.config')
    , rollupCoverage = require('rollup-plugin-istanbul')


rollup.format = 'iife'
rollup.plugins[0] = rollupCoverage({
    exclude: ['test/**/*.js'] 
})

// Karma configuration
// Generated on Wed Jan 18 2017 23:39:45 GMT-0200 (BRST)

module.exports = function(config) {
    let tmp = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'test/fixtures/*.html',
            'test/index.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/fixtures/*.html': ['html2js'],
            'test/index.js': ['rollup']
        },

        rollupPreprocessor: rollup,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir : 'coverage/',
            reporters: [{
                type: "lcov",
                subdir: "lcov"
            }],
            includeAllSources: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    }

    if(process.env.TRAVIS){
        tmp.browsers = ['Chrome_travis_ci']
    }

    config.set(tmp)
}
