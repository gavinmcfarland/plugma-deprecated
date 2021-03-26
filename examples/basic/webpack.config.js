module.exports = {
	entry: "./code.ts",
	output: {
		path: "/",
		filename: "code.js",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
	},
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.ts?$/, use: ["ts-loader"], exclude: /node_modules/ },
		],
	},
};
