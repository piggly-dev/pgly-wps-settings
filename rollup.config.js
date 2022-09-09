import { version } from 'package.json';

import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import uglify from '@lopatnov/rollup-plugin-uglify';

module.exports = [
	{
		input: 'src/js/index.ts',
		external: ['axios'],
		output: {
			file: `dist/js/pgly-wps-settings.v${version}.js`,
			name: 'pglyWps',
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
		plugins: [
			json(),
			resolve({ browser: true }),
			typescript(),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
		],
	},
	{
		input: 'src/js/index.ts',
		external: ['axios'],
		output: {
			file: `dist/js/pgly-wps-settings.v${version}.min.js`,
			name: 'pglyWps',
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
		plugins: [
			json(),
			resolve({ browser: true }),
			typescript(),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			uglify(),
		],
	},
];
