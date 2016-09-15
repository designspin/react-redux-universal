require('dotenv').config();
//var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, '../public');

var baseConfig = require('./webpack.config.js');

baseConfig.entry = [
	//'webpack/hot/dev-server',
	//'webpack-dev-server/client?http://localhost:3000',
	(ROOT_PATH + '/client-render.js'),
];

baseConfig.plugins = [
	//new webpack.HotModuleReplacementPlugin(),
	//new LiveReloadPlugin(),
]

baseConfig.devServer = {
	hot: true,
	publicPath: 'http://localhost:3000'
}

module.exports = baseConfig;