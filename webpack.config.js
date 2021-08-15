const path = require('path');
const webpack = require('webpack');
require('@babel/register');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';

	const config = {
		entry: {
			main: path.resolve(__dirname, './src/js/index.ts'),
			//styles: path.resolve(__dirname, './src/scss/global.scss'),
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: 'wpgly-wps-settings.[name].js'
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src/js"), 
			},
			extensions: [
				'.tsx',
				'.ts',
				'.js',
				'.json',
				'.scss'
			]
		},
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: [
						'babel-loader'
					]
				}, 
				{
					test: /\.s(a|c)ss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDev
							}
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'PGLY WPS SETTINGS',
				template: path.resolve(__dirname, './src/index.html'),
				filename: 'index.html'
			}),
			// new FixStyleOnlyEntriesPlugin(),
			new ForkTsCheckerWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: isDev ? 'wpgly-wps-settings.[name].css' : 'wpgly-wps-settings.[name].[hash].css',
				chunkFilename: isDev ? 'wpgly-wps-settings.[id].css' : 'wpgly-wps-settings.[id].[hash].css'
			}),
		],
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			port: 8080,
		}
	};
	
	if ( isDev )
	{ config.devtool = 'source-map'; }

	return config;
};