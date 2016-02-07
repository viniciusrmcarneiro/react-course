const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const config = function({hot} = {hot: false,}){
    return {
        target: 'web',
        entry: {
            app: [
                'babel-polyfill',
                path.join(__dirname, '/app/index.js'),
            ],
            // vendors: Object.keys(pkg.dependencies),
            tests: [
                'babel-polyfill',
                'mocha!/'+ path.join(__dirname, '/tests/index.js'),
            ],
        },
        output: {
            path: path.join(__dirname),
            filename: '[name].js',
            chunkFilename: '[id].[name].chunk.js',
            publicPath: '/',
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
            new webpack.optimize.CommonsChunkPlugin('vendors.js'),
        ],
        devtool: 'source-map',
        debug: true,
        module: {
            loaders: [
                {
                    test: /\.js(x)?$/,
                    loaders: (hot ? ['react-hot'] : []).concat(['babel-loader?plugins=transform-runtime']),
                    exclude: [/node_modules/],
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
    };
};

module.exports = config;
