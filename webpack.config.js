const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill','./src/index.js'],
	output: {
		path: __dirname,
		filename: './public/js/bundle.js'
	},
	resolve: {
	    modules: [__dirname, 'node_modules'],
	    alias: {
			  ACTIONS	: 'src/actions/',
			  CONSTANTS	: 'src/constants/',
			  DATA		: 'src/data/',
			  SERVICES	: 'src/services/',
			  REDUCERS	: 'src/reducers/',
			  PUBLIC	: 'public/',
	    }
  	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react', 'stage-0']
				},
				test: /\.js?$/,
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
				  fallback: 'style-loader',
				  use: [
					'css-loader',
					'sass-loader'
				  ]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('public/css/style.hhr.v4.css'),
	]
};
