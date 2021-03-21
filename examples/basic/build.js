/**
 * This scripts appends the current version number to every node created.
 */

const fs = require('fs')

var path

if (process.env.NODE_ENV === 'test') {
	path = process.cwd() + 'src/stub/'
} else {
	path = process.cwd()
}

console.log(path)

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
	data = data.replace(/((?:var|const|let) (\w+)\s*=\s*figma\.createRectangle\(\)\s*[;|\n])/gmi, `$1\n$2.setPluginData("version", ${JSON.stringify(pkg.version)})`)

	fs.writeFile('code.js', data, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
})

// const codeFile = require("./code.js").toString()
// console.log(codeFile)
