require('dotenv').config();
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, '../public');

var baseConfig = require('./webpack.config.js');

baseConfig.entry = {
	//'webpack/hot/dev-server',
	//'webpack-dev-server/client?http://localhost:3000',
	js: [
		ROOT_PATH + '/client-render.js'
	],
	vendor: [
		'react', 'react-dom', 'redux', 'redux-thunk', 'react-redux'
	]
};

baseConfig.plugins.push(
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.bundle.js'
	}),
	new webpack.DefinePlugin({
		__BROWSER__: JSON.stringify(true)
	})
);


baseConfig.devServer = {
	hot: true,
	publicPath: 'http://localhost:3000'
}

module.exports = baseConfig;