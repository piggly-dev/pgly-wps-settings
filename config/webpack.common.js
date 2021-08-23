const paths = require('./paths');
const packageJSON = require('../package.json');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	// Where webpack looks to start building the bundle
	entry: {
		bundle: [ paths.src + '/js/index.ts' ]
	},

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: `js/pgly-wps-settings.[name].v${packageJSON.version}.js`,
		publicPath: 'auto',
	},

	// Customize the webpack build process
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'js/**'
			],
		}),
		new ForkTsCheckerWebpackPlugin()
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			},
		],
	},

	resolve: {
		modules: [
			paths.src, 
			'node_modules'
		],
		alias: {
			"@": paths.src, 
		},
		extensions: [
			'.tsx',
			'.ts',
			'.js',
			'.json'
		]
	},
};