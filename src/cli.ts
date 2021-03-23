/**
 * This scripts appends the current version number to every node created.
 */

const fs = require('fs')

function _getCallerFile() {
	var originalFunc = Error.prepareStackTrace;

	var callerfile;
	try {
		var err = new Error();
		var currentfile;

		Error.prepareStackTrace = function (err, stack) { return stack; };

		currentfile = err.stack.shift().getFileName();

		while (err.stack.length) {
			callerfile = err.stack.shift().getFileName();

			if (currentfile !== callerfile) break;
		}
	} catch (e) { }

	Error.prepareStackTrace = originalFunc;

	return callerfile;
}

var location

if (process.env.NODE_ENV === 'test') {
	location = process.cwd() + '/src/stub/'
} else {
	location = process.cwd()
}

const pkg = require(location + "/package.json")

function injectCode() {

	fs.readFile(location + "/code.js", "utf8", (err, data) => {
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

		fs.writeFile(location + "/code.js", data, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	})
}

export default function cli(options) {
	var pathToMemory = __dirname + "/../bin/memory.json"
	var pathToPkg = location + "/package.json"
	var memory = require(pathToMemory)

	// Should increment version number?
	var shouldIncrementVersion = false
	if (memory.lastIncrementedWithManifest
		&& !memory.firstTimeIncrementedWithManifest
		&& process.env.NODE_ENV === "manifest") {
		shouldIncrementVersion = true
	}

	// Change state of memory
	if (process.env.NODE_ENV === "manifest") {
		memory.firstTimeIncrementedWithManifest = false
		memory.lastIncrementedWithManifest = true
	}
	else {
		memory.lastIncrementedWithManifest = false
	}

	var newMemory = JSON.stringify(memory, null, '\t')

	fs.writeFile(pathToMemory, newMemory, (err) => {
		if (err) throw err;
		// console.log('Memory updated!');
	});

	// We check to see if the CLI was used to incremenet version, because if it was we don't want to increment it before being published
	if (shouldIncrementVersion || memory.firstTimeIncrementedWithManifest || process.env.NODE_ENV !== "manifest") {
		// Update version number
		var versionSplit = pkg.version.split(".")
		versionSplit = versionSplit.map((item => parseInt(item)))

		switch (options.name) {
			case "patch":
				versionSplit[2] += 1
				break
			case "minor":
				versionSplit[1] += 1
				break
			case "major":
				versionSplit[0] += 1
		}

		pkg.version = versionSplit.join(".")

		console.log(pkg.version)

		var newPkg = JSON.stringify(pkg, null, '\t')

		fs.writeFile(pathToPkg, newPkg, (err) => {
			if (err) throw err;
			// console.log('Updated version number!');
		});
	}

	injectCode()
}

