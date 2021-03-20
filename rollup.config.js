import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import htmlBundle from 'rollup-plugin-html-bundle';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace';
// import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [{
	input: 'frontend/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		// css({ output: 'bundle.css' }),
		// css(),
		postcss(),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
			tsconfig: "./frontend/tsconfig.json"
		}),
		htmlBundle({
			template: 'frontend/template.html',
			target: 'public/index.html',
			inline: true
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},
{
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
		name: 'code'
	},
	plugins: [
		typescript(),
		// !production && replace({
		// 	'process.env.VERSIONS_PATH': JSON.stringify('./package.json'),
		// 	'process.env.PKG_PATH': JSON.stringify('./src/versions.json')
		// }),
		// replace({
		// 	'__pkgFile__': JSON.stringify('./package.json'),
		// 	'__versionsFile__': JSON.stringify('./package.json')
		// }),
		resolve(),
		json(),
		production && terser()
	]
}];
