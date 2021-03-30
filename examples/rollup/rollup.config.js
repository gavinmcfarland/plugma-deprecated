// import svelte from 'rollup-plugin-svelte';
import globals from 'rollup-plugin-node-globals';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
// import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
// import htmlBundle from 'rollup-plugin-html-bundle';
// import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
// import autoprefixer from 'autoprefixer';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import path from 'path';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

const production = !process.env.ROLLUP_WATCH;

// const externalId = path.resolve('./versions.json');

export default [
	// {
	// 	input: 'frontend/main.ts',
	// 	output: {
	// 		sourcemap: true,
	// 		format: 'iife',
	// 		name: 'app',
	// 		file: 'public/build/bundle.js'
	// 	},
	// 	plugins: [
	// 		svelte({
	// 			preprocess: sveltePreprocess({ sourceMap: !production }),
	// 			compilerOptions: {
	// 				// enable run-time checks when not in production
	// 				dev: !production
	// 			}
	// 		}),
	// 		// we'll extract any component CSS out into
	// 		// a separate file - better for performance
	// 		// css({ output: 'bundle.css' }),
	// 		// css(),
	// 		postcss(),
	// 		// If you have external dependencies installed from
	// 		// npm, you'll most likely need these plugins. In
	// 		// some cases you'll need additional configuration -
	// 		// consult the documentation for details:
	// 		// https://github.com/rollup/plugins/tree/master/packages/commonjs
	// 		resolve({
	// 			browser: true,
	// 			dedupe: ['svelte']
	// 		}),
	// 		commonjs(),
	// 		typescript({
	// 			sourceMap: !production,
	// 			inlineSources: !production,
	// 			tsconfig: "./frontend/tsconfig.json"
	// 		}),
	// 		htmlBundle({
	// 			template: 'frontend/template.html',
	// 			target: 'public/index.html',
	// 			inline: true
	// 		}),

	// 		// In dev mode, call `npm run start` once
	// 		// the bundle has been generated
	// 		!production && serve(),

	// 		// Watch the `public` directory and refresh the
	// 		// browser on changes when not in production
	// 		!production && livereload('public'),

	// 		// If we're building for production (npm run build
	// 		// instead of npm run dev), minify
	// 		production && terser()
	// 	],
	// 	watch: {
	// 		clearScreen: false
	// 	}
	// },
	{
		input: 'code.ts',
		// external: ['./versions.json'],
		output: {
			file: 'code.js',
			format: 'cjs',
			name: 'code'
		},
		plugins: [
			typescript(),

			nodePolyfills(),
			nodeResolve({
				browser: true
			}),
			replace({
				'process.env.PKG_PATH': JSON.stringify(process.cwd() + '/package.json'),
				'process.env.VERSIONS_PATH': JSON.stringify(process.cwd() + '/.plugma/versions.json')
			}),
			// replace({
			// 	values: {
			// 		'process.cwd()': JSON.stringify(process.cwd())
			// 	},
			// 	delimiters: ['', '']
			// }),
			json(),
			dynamicImportVars({
				// options
			}),
			commonjs(),


			// injectProcessEnv({
			// 	NODE_ENV: 'production',
			// 	PKG_PATH: './package.json',
			// 	VERSIONS_PATH: './package.json'
			// }),

			// globals(),



			production && terser()
		]
	}];
