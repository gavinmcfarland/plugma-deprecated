export default (plugin) => {

	plugin.ui = {
		html: __html__,
		width: 250,
		height: 400
	}

	if (plugin.updateAvailable) {
		plugin.setStartPage("whatsNew")
	}

	plugin.on('buttonPressed', () => {
		console.log("Create table node")
	})

	return {
		'exampleCommand': ({ ui }) => {
			ui.width = 250
			ui.height = 500
		},
		'exampleCommandTwo': ({ ui }) => {
			ui.visible = true
			ui.open = true
			console.log(ui.page)

		}
	}
}
