/**
 * This scripts appends the current version number to every node created.
 */

// TODO: Is it too hard to try and add this after it's been minimised? I guess would run into this issue anyway, if someone used abbreviated form of declaring variables.

const fs = require('fs')

export default function build() {
	console.log("hello")

	var path

	if (process.env.NODE_ENV === 'test') {
		path = process.cwd() + '/src/stub/'
	} else {
		path = process.cwd()
	}

	const pkg = require(path + "/package.json")

	var list = [
		'figma\.createFrame\(\)',
		'figma\.createRectangle\(\)',
		'figma\.createElipse\(\)',
		'figma\.createPolygon\(\)',
		'figma\.createStar\(\)',
		'figma\.createLine\(\)'
	]


	fs.readFile(path + "/code.js", "utf8", (err, data) => {
		// 1. First search for variable with match.
		// 2. Then search for matches within.
		data = data.replace(/((?:const|var|let)\s*\w+\s*=\s*figma\.create\w+\D+(?:;|\n))/gmi, (match, p1, p2, p3, offset, string) => {

			var matches = []
			match.replace(/(\w+)\s*=\s*figma\./gmi, (match, p1, p2, p3, offset, string) => {
				matches.push(p1)
			})

			matches = matches.map((item) => `${item}.setPluginData("version", ${JSON.stringify(pkg.version)})`)

			var newString = matches.join(";") + ";"

			return match + newString

		})

		fs.writeFile(path + "/code.js", data, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	})
}

