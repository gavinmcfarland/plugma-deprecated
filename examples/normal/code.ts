import plugma from 'plugma'

plugma((plugin) => {

	plugin.ui = {
		html: __html__,
		width: 250,
		height: 400
	}

	if (plugin.updateAvailable) {
		plugin.setStartPage("whatsNew")
	}

	plugin.update(({ version, changes }) => {
		console.log(version, changes)
	})

	plugin.on('buttonPressed', () => {
		console.log("Create table node")
	})

	return {
		'createRectangle': () => {
			figma.createRectangle()
		},
		'settings': ({ ui }) => {
			ui.show()
		}
	}
})
