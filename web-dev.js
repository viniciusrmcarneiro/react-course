const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config')({hot: true,});
const entryDefault =[
	'webpack-dev-server/client?http://0.0.0.0:8081',
	'webpack/hot/only-dev-server',
];

const newConfig = {
	...config,
	entry: Object.keys(config.entry).reduce((r,key) => {
		r[key] = entryDefault.concat(config.entry[key] instanceof Array ? config.entry[key] : [config.entry[key]]);
		return r;
	},{}),
};

const compiler = webpack(newConfig);

const server = new webpackDevServer(compiler, {
	open: true,
	hot: true,
	host: '0.0.0.0',
	historyApiFallback: true,
	stats: {
		colors: true,
		exclude:[/node_modules/],
	},
})

server.listen(8081, '0.0.0.0', function(){
	console.log('Listening at 0.0.0.0:8081');
})
