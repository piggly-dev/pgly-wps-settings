const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const paths = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	// Set the mode to development or production
	mode: 'development',

	// Control how source maps are generated
	devtool: 'source-map',

	// Spin up a server for quick development
	devServer: {
		host: '0.0.0.0',
		historyApiFallback: true,
		contentBase: paths.build,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
		allowedHosts: ['auto'],
	},

	// Customize the webpack build process
	plugins: [
		// Generates an HTML file from a template
		new HtmlWebpackPlugin({
			title: 'PGLY WPS SETTINGS',
			template: paths.src + '/index.html',
			filename: 'index.html',
		}),
	],
});
