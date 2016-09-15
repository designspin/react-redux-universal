require('dotenv').config();
var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

var ROOT_PATH = path.resolve(__dirname, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, '../public');

module.exports = {
	entry: '',
	output: {
		path: BUILD_PATH,
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/, // test for js and jsx files only
				loader: ['babel'],
				exclude: /node_modules/,
				query: {
					"presets": ["es2015", "react"],
					"ignore": ["/node_modules/"],
				}
			},
			{
				test: /\.css$/,
				loaders: [
					'isomorphic-style-loader',
					'css-loader',
					'postcss-loader'
				],
				exclude: /node_modules/
			}
		]
	},
	postcss: function() {
		return [autoprefixer({browsers: ['last 2 versions']}), precss, cssnano];
	},
	plugins: []
}