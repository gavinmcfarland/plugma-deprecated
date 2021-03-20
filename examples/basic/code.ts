import plugma from '../../dist/index'

plugma((plugin) => {
	console.log(plugin)

	figma.showUI(__html__);

	plugin.on('create-rectangles', (msg) => {
		const nodes: SceneNode[] = [];
		for (let i = 0; i < msg.count; i++) {
			const rect = figma.createRectangle();
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

	return {
		'createRectangles': () => {
			console.log("test")
		}
	}

})


