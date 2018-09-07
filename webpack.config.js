const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: {
		index: ['babel-polyfill', './src/index.js']
	},
	output: {
		path: __dirname,
		filename: './public/js/[name].bundle.js'
	},
	resolve: {
		modules: [__dirname, 'node_modules', path.resolve(__dirname,"src")],
		aliasFields: ['browser'],
        descriptionFiles: ['package.json'],
        extensions:[".js",".json",".jsx",".css"],
        unsafeCache: true,
        unsafeCache: {},
        cachePredicate: (path, request) => true,
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
			},
			{
				test: /\.css$/,
				use: [
					'css-loader',
				  ]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('public/css/style.hhr.v4.css'),
	]
};