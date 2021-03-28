import plugma from 'plugma'

plugma((plugin) => {
	console.log(plugin)

	plugin.ui = {
		html: __html__,
		width: 250,
		height: 300
	}

	plugin.command('createRectangles', ({ ui, data }) => {

		ui.show(data)

		plugin.on('create-rectangles', (msg) => {

			const nodes: SceneNode[] = [];
			for (let i = 0; i < msg.count; i++) {
				const rect = figma.createRectangle();
				const rect2 = figma.createRectangle()
				console.log(rect2);
				rect.x = i * 150;
				rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
				figma.currentPage.appendChild(rect);
				nodes.push(rect);
			}
			figma.currentPage.selection = nodes;
			figma.viewport.scrollAndZoomIntoView(nodes);
			figma.closePlugin();
		})

		plugin.on('cancel', () => {
			figma.closePlugin();
		})
	})

})


