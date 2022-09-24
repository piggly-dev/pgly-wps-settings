import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import uglify from '@lopatnov/rollup-plugin-uglify';

const extensions = ['.js', '.ts'];
const version = '026';

module.exports = [
	{
		input: 'src/js/index.ts',
		external: ['axios'],
		output: {
			file: `dist/umd/pgly-wps-settings.js`,
			name: 'pglyWps' + version,
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
		plugins: [
			json(),
			resolve({ browser: true, extensions }),
			commonjs(),
			typescript({ declaration: false }),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
				include: ['src/js/**/*'],
				extensions,
			}),
		],
	},
	{
		input: 'src/js/index.ts',
		external: ['axios'],
		output: {
			file: `dist/umd/pgly-wps-settings.min.js`,
			name: 'pglyWps' + version,
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
		plugins: [
			json(),
			resolve({ browser: true, extensions }),
			commonjs(),
			typescript({ declaration: false }),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
				include: ['src/js/**/*'],
				extensions,
			}),
			uglify({ compress: true }),
		],
	},
];
