require('dotenv').config();
var path = require('path');

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
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					"presets": ["es2015", "react"],
					"ignore": ["/node_modules/"],
				}
			}
		]
	}
}