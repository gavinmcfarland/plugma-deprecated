const path = require('path');

module.exports = (env, argv) => ({
	// This is necessary because Figma's 'eval' works differently than normal eval
	devtool: argv.mode === 'production' ? false : 'inline-source-map',
	entry: "./code.ts",
	output: {
		path: path.resolve(__dirname),
		filename: "./code.js"
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
	},
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
		],
	},
	node: {
		__filename: true,
		__dirname: true
	}

});
