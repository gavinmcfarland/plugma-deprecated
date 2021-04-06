/**
 * This scripts appends the current version number to every node created.
 */

// TODO: Use manifest to store version number and get path for code

const chalk = require('chalk');

const fs = require('fs')

const { exec } = require("child_process");
const path = require('path')


var root

if (process.env.PWD.endsWith("bin")) {
	if (process.env.PWD.endsWith(".bin")) {

		root = path.resolve(process.env.PWD + "/../..")
	}
	else {
		root = path.resolve(process.env.PWD + "/../../..")
	}

}
else {
	root = process.cwd()
}


const pkg = require(root + "/package.json")

async function getFileUpdatedDate() {

	var manifest = await getManifest()

	var stats;

	try {
		stats = fs.statSync(path.resolve(root, manifest.main))
	}
	catch (e) {
		console.error(`[plugma] Cannot find ${chalk.inverse('main')} file at: ${e.path} \n`)
	}

	return stats.mtime

}



function updateVersionLog(pathToVersionLog, options) {

	if (options.name !== '') {
		var pathToTemporyFile = __dirname + "/../bin/message.md"

		function addVersion() {
			// Update version log


			fs.readFile(pathToVersionLog, "utf8", (e, data) => {

				if (e) {
					console.error(`[plugma] Cannot find ${chalk.inverse('versions')} file at: ${e.path} \n`)
				}

				data = JSON.parse(data)

				// If using an array
				// data.unshift({ [`${pkg.version}`]: [] })

				// If using object
				// data[pkg.version] = [];


				fs.readFile(pathToTemporyFile, "utf8", (err, data2) => {
					var content

					if (options.m === true) {
						// Split string into a list and remove empty lines
						content = data2.split('\n').filter((item) => item !== '')
					}
					else if (typeof options.m === "string") {
						content = [options.m]
					}

					// Convert to array
					data = Object.entries(data)

					// Add new info to top
					data.unshift([[`${pkg.version}`], content])

					// Convert back to object
					data = Object.fromEntries(data)


					fs.writeFile(pathToVersionLog, JSON.stringify(data, null, '\t'), (err) => {
						if (err) throw err

						// Reset tmp file back to being blank
						fs.readFile(pathToTemporyFile, "utf8", (err, data2) => {
							fs.writeFile(pathToTemporyFile, "", (err) => {
								if (err) throw err
							})
						})
					})
				})



			})

		}

		if (options.m == true) {
			var editor = require('editor')
			editor(pathToTemporyFile, function (code, sig) {
				addVersion()
				// console.log('finished editing with code ' + code + sig);
			});

		}

		if (typeof options.m === "string") {
			addVersion()
		}
	}
	else if (options.m) {
		console.error(`Please provide a version ${chalk.underline('name')}`)
	}

}

async function getManifest() {
	var array = [
		path.resolve(root, `manifest.json`),
		path.resolve(root, 'public', 'manifest.json')
	]

	var pathToManifest;

	if (fs.existsSync(array[0])) {
		pathToManifest = array[0]
	}
	else if (fs.existsSync(array[1])) {
		pathToManifest = array[1]
	}

	return new Promise((resolve, reject) => {
		fs.readFile(pathToManifest, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(JSON.parse(data));
		});
	});
}

export default function cli(options) {
	function injectCode(memory) {

		getManifest().then((res) => {
			var pathToCode = path.resolve(root, res.main)

			fs.readFile(pathToCode, "utf8", (err, data) => {
				// 1. First search for variable with match.
				// 2. Then search for matches within.
				if (err) {
					throw err
				}

				function getVersionData() {
					var match = data.match(/^\/\/ pluginVersion=(.+)[\s|\n]*/)

					if (match) {
						data = data.replace(/^\/\/ pluginVersion=(.+)[\s|\n]*/, "")
						return match[1]
					}
					else {
						return false
					}
				}

				// Don't inject code unless different from current version
				if (getVersionData() !== pkg.version) {

					// Perform a saftey check incase file has not been rebuilt. Want to avoid adding duplicated verison numbers
					if (getFileUpdatedDate().toString() !== memory.timestamp.toString()) {
						data = `// pluginVersion=${pkg.version}\n` +
							`figma.clientStorage.setAsync("pluginVersion", ${JSON.stringify(pkg.version)})\n` +
							`figma.root.setSharedPluginData(${JSON.stringify(pkg.name)}, "pluginVersion", ${JSON.stringify(pkg.version)})\n`
							+ data

						data = data.replace(/((?:const|var|let)\s*\w+\s*=\s*figma\.create\w+\D+(?:;|\n))/gmi, (match, p1, p2, p3, offset, string) => {

							var matches = []
							match.replace(/(\w+)\s*=\s*figma\./gmi, (match, p1, p2, p3, offset, string) => {
								matches.push(p1)
							})

							matches = matches.map((item) => `${item}.setSharedPluginData(${JSON.stringify(pkg.name)}, "pluginVersion", ${JSON.stringify(pkg.version)})`)

							var newString = matches.join(";") + ";"

							return match + newString

						})

						fs.writeFile(pathToCode, data, (err) => {
							if (err) throw err;
							// console.log('Version data added');
						});
					}
				}

			})
		})

	}

	if (options._[0] === "version") {
		var pathToMemory = __dirname + "/../bin/memory.json"
		var pathToVersionLog = root + "/.plugma/versions.json"
		var pathToPkg = root + "/package.json"


		var pathToCode = root + "/code.js"


		// Set timestamp of when build was run was last modified
		var memory = require(pathToMemory)
		memory.timestamp = getFileUpdatedDate()


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
					break
			}

			pkg.version = versionSplit.join(".")


			var newPkg = JSON.stringify(pkg, null, '\t')


			// Update new version number and inject code
			fs.writeFile(pathToPkg, newPkg, (e) => {
				if (e) {
					console.error(`[plugma] Cannot find ${chalk.inverse('package.json')} file at: ${e.path} \n`)
				}

				if (options.b || options.build || options.i) {
					// console.log('Updated version number!');
					// We need to create a new build first so that version data doesn't get duplicated
					// function shouldReinject() {
					// 	return getFileUpdatedDate().toString() === memory.timestamp.toString()
					// }

					if (options.i) {

						// Need to make sure not injected when code already been injected
						injectCode(memory)

					}

					else if (options.b || options.build) {
						exec(`export PATH="$PATH:"/usr/local/bin/ && npm run --prefix ${root} build`, (error, stdout, stderr) => {
							if (error) {
								console.log(`error: ${error.message}`);
								return;
							}
							if (stderr) {
								// console.log(`stderr: ${stderr}`);
							}
							if (stdout) {
								// console.log(`stdout: ${stdout}`);
								injectCode(memory)
							}

						});
					}

				}

				// Update version log
				updateVersionLog(pathToVersionLog, options)
			});



			console.log(`v${pkg.version}`)



		}
	}

}

