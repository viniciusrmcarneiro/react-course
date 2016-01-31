const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');

module.exports = function(config) {
	config.set({
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

		reporters: [
			'coverage',
		],

		coverageReporter: {
			dir: 'coverage',
			reporters: [
				{type: 'html', subdir: '.',},
				{type: 'text',},
				{type: 'text-summary',},
			],
		},

		webpack: {
			module: {
				preLoaders: [
					{
						test: /\.js(x)?$/,
						loader: 'babel-istanbul',
						include: [
							path.join(__dirname,'/app'),
						],
						query: {
							cacheDirectory: true,
						},
					},
				],
				loaders: [
					{
						test: /\.js(x)?$/,
						loader: 'babel',
						query: {
							plugins: ['transform-runtime'],
						},
						exclude: /node_modules/,
						include: [
							path.join(__dirname,'/app'),
							path.join(__dirname,'/tests'),
						],
					},
					{
						test: /\.json$/,
						loader: 'json-loader',
					},
					{
						test: /\.(css|scss)$/,
						loaders: ['style','css?sourceMap','autoprefixer','sass?sourceMap'],
					},
					{
						test: /sinon.*\.js$/,
						loader: 'imports?define=>false,require=>false',
					},
				],
				noParse: [
					/\.min\.js/,
					/node_modules\/sinon\//,
				],
			},
			resolve: {
				alias:{
					app: path.join(__dirname,'/app'),
					sinon: 'sinon/pkg/sinon',
				},
				modulesDirectories: [
					'node_modules',
				],
			},
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
			require('karma-webpack'),
			require('istanbul-instrumenter-loader'),
			require('karma-coverage'),
			require('karma-spec-reporter'),
		],

		browsers: ['PhantomJS',],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		captureTimeout: 60000,
		singleRun: false,
	});
}
