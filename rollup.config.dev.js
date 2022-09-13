import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';

const extensions = ['.js', '.ts'];

function serve() {
	// Keep a reference to a spawned server process
	let server;

	function toExit() {
		// Kill the server if it exists
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			// Spawn a child server process
			server = require('child_process').spawn('npm', ['run', 'dev:start'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true,
			});

			// Kill the server on process termination or exit
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
	};
}

module.exports = [
	{
		input: 'src/js/index.ts',
		external: ['axios'],
		output: {
			file: `public/assets/js/pgly-wps-settings.js`,
			name: 'pglyWps',
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
		plugins: [
			json(),
			resolve({ browser: true, extensions }),
			commonjs(),
			typescript({ declaration: false, declarationDir: './dist/types' }),
			babel({
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
				include: ['src/js/**/*'],
				extensions,
			}),
			serve(),
			livereload('public'),
		],
	},
];
