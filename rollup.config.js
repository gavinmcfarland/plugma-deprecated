import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json'
// import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;


export default [
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
	},
	{
		input: 'src/cli.ts',
		output: {
			file: 'dist/cli.js',
			format: 'cjs',
			name: 'code'
		},
		plugins: [
			typescript(),
			resolve(),
			json(),
			production && terser()
		]
	}];
