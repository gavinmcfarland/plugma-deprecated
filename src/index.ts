
// TODO: Check package from working directory
// TODO: Check versions from working directory
// TODO: How to fix issue of referenceing file when used as depency

// import pkg from '../package.json';
// import versionHistory from './versions.json';
// import semver from 'semver';

// import fs from 'fs';
// import path from 'path';

var versionHistory, pkg;

// var process = require('process')

if (process.env.PKG_PATH) {
	pkg = require(process.env.PKG_PATH);
}

if (process.env.VERSIONS_PATH) {
	versionHistory = require(process.env.VERSIONS_PATH);
}
// try {
// 	versionHistory = require("./package.json");
// }
// catch {
// 	versionHistory = {}
// }

// pkg = require(process.cwd() + "/package.json");
// }

// console.log(process.cwd() + "/package.json");


// fs.readFile("../package.json", (err, data) => {
// 	console.log(err, data)
// })

// const file = require("package.json")
// console.log(file)

// function updateAvailable() {
// 	var currentVersion = figma.root.getPluginData("pluginVersion") || pkg.version;
// 	var newVersion = pkg.version;

// 	if (semver.gt(newVersion, currentVersion)) {
// 		return true
// 	}
// 	else {
// 		false
// 	}
// }

export default function plugma(plugin) {
	var pluginState: any = {

		updateAvailable: false,
		ui: {}
	}

	if (pkg?.version) {
		pluginState.version = pkg.version
	}

	// pluginState.updateAvailable = updateAvailable()


	var eventListeners = []
	var menuCommands = []

	pluginState.on = (type, callback) => {
		eventListeners.push({ type, callback })
	}

	pluginState.command = (type, callback) => {
		menuCommands.push({ type, callback })
	}

	// Override default page name if set
	var pageMannuallySet = false;
	pluginState.setStartPage = (name) => {
		pluginState.ui.page = name
		pageMannuallySet = true
	}



	// pluginState.update = (callback) => {
	// 	for (let [version, changes] of Object.entries(versionHistory)) {
	// 		if (version === pkg.version) {
	// 			// for (let i = 0; i < changes.length; i++) {
	// 			// 	var change = changes[i]

	// 			// }
	// 			callback({ version, changes })
	// 		}
	// 	}
	// }



	var pluginCommands = plugin(pluginState)

	// // Override default page name if set
	// if (pageName[0]) {
	// 	pluginState.ui.page = pageName[0]
	// }

	// console.log("pageName", pluginState.ui.page)

	var pluginObject = Object.assign({}, pluginState, { commands: pluginCommands })

	if (pluginCommands) {
		for (let [key, value] of Object.entries(pluginCommands)) {
			// If command exists in manifest
			if (figma.command === key) {
				// Pass default page for ui
				if (!pageMannuallySet) {
					pluginState.ui.page = key
				}

				// Override default page name if set
				// if (pageName[0]) {
				// 	pluginState.ui.page = pageName[0]
				// }

				// Call function for that command

				value(pluginState)

				// Show UI?
				if (pluginState.ui.open) {
					console.log("open?")
					figma.showUI(pluginState.ui.html)
				}

			}
		}
	}


	figma.ui.onmessage = message => {
		for (let eventListener of eventListeners) {
			// console.log(message)
			if (message.type === eventListener.type) eventListener.callback(message);
		}
	};

	pluginState.ui.show = (data) => {
		figma.showUI(pluginState.ui.html, { width: pluginState.ui.width, height: pluginState.ui.height })
		figma.ui.postMessage(data)
	}

	for (let command of menuCommands) {
		if (figma.command === command.type) {
			command.callback(pluginState);
		}
	}

	// console.log(pluginObject)
}
