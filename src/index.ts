
// TODO: Check package from working directory
// TODO: Check versions from working directory

import pkg from '../package.json';
import versionHistory from './versions.json';
import semver from 'semver';
import fs from 'fs'

// fs.readFile("../package.json", (err, data) => {
// 	console.log(err, data)
// })

// const file = require("../package.json")
// console.log(file)

function updateAvailable() {
	var currentVersion = figma.root.getPluginData("pluginVersion") || pkg.version;
	var newVersion = pkg.version;

	if (semver.gt(newVersion, currentVersion)) {
		return true
	}
	else {
		false
	}
}

export default function plugma(plugin) {
	var pluginState: any = {
		version: pkg.version,
		updateAvailable: false,
		ui: {}
	}

	pluginState.updateAvailable = updateAvailable()


	var eventListeners = []

	pluginState.on = (type, callback) => {
		eventListeners.push({ type, callback })
	}

	// Override default page name if set
	var pageMannuallySet = false;
	pluginState.setStartPage = (name) => {
		pluginState.ui.page = name
		pageMannuallySet = true
	}

	pluginState.update = (callback) => {
		for (let [version, changes] of Object.entries(versionHistory)) {
			if (version === pkg.version) {
				// for (let i = 0; i < changes.length; i++) {
				// 	var change = changes[i]

				// }
				callback({ version, changes })
			}
		}
	}



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
			if (message.type === eventListener.type) eventListener.callback(message.data);
		}
	};

	// console.log(pluginObject)
}
