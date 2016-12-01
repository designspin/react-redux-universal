require('dotenv').config();
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var ROOT_PATH = path.resolve(__dirname, 'src');

var baseConfig = require('./webpack.config.js');

/* ==============================================

Prevent node_modules being bundled
(express server compatability)

================================================= */

var nodeModules = {};

fs.readdirSync('node_modules')
	.filter(function(x) {
		return['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

baseConfig.entry = (ROOT_PATH + '/server.js');

baseConfig.target = 'node';

baseConfig.plugins.push(
	new webpack.DefinePlugin({
		__BROWSER__: JSON.stringify(false)
	})
)

baseConfig.output = {
	path: ROOT_PATH,
	filename: 'serverBundle.js'
};

baseConfig.externals = nodeModules;

module.exports = baseConfig;