const webpackConfig = require('./webpack.config')({hot: false,});
const webpack = require('webpack');
const configTest = require('./config/test').app;

module.exports = function(){
    return {
        files: [
            'tests/index.js',
        ],
        preprocessors: {
            'tests/index.js': [
                'webpack',
                'sourcemap',
            ],
        },

        frameworks: ['mocha',],

        reporters: [],

        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            devtool: 'inline-source-map',
            plugins: [
                new webpack.DefinePlugin({"process.env": {
                    config: JSON.stringify(configTest),
                }}),
            ],
            
        },

        webpackMiddleware: {
            stats: {
                colors: true,
                exclude: [/node_modules/],
            },
        },

        plugins: [
            require('karma-phantomjs-launcher'),
            require('karma-mocha'),
            require('karma-sourcemap-loader'),
            require('karma-mocha-reporter'),
            require('karma-webpack'),
            require('karma-spec-reporter'),
        ],

        browsers: ['PhantomJS',],
        port: 9876,
        colors: true,
        autoWatch: true,
        captureTimeout: 60000,
        singleRun: false,

    };
}
