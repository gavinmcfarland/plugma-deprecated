# Plugma

<p>
    <a href="https://www.npmjs.com/package/plugma"><img src="https://img.shields.io/npm/v/plugma.svg"></a>
    <a href="https://travis-ci.org/limitlessloop/plugma"><img src="https://img.shields.io/travis/limitlessloop/plugma.svg"></a>  
</p>

> This project is currently in alpha so some things might not work as expected

Plugma is a small framework and CLI that makes it easier to develop and maintain Figma plugins.

## Features

- Convenient methods for message handling, menu commands, showing and posting to UI and more
- A single reference for managing plugin state more easily throughout your code
- Find documents and nodes created by past versions of your plugin
- Keep track of changes using the CLI 

## Example

Below is an example of how you can create Figma plugins with plugma.

```js
// code.ts

import plugma from 'plugma'

plugma((plugin) => {

    plugin.ui = {
        html: __html__,
        width: 250,
        height: 400
    }

    plugin.command('createRectangles', ({ui, data}) => {
        
        ui.show(data)
        
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
    })
})
```

## Usage

### State Management

The framework provides a `plugin` reference which gives you the state of the plugin at any given time. This is useful for keeping consistancy like, UI state and when the plugin should close.
```js
// plugin properties

plugin.ui {
    html: __html,
    width: 250,
    height: 500
}
```

### Menu Commands

Simplified developer experience for managing commands. Each command has access to the state of the plugin, including the name of the command used to start it.

```js
plugin.command('createRectangle', ({ui, command, version, data}) => {
    ui.show(data)
})
```

### Message Handling

There is a simple method for listening for messages from the UI using `plugin.on()`.

```js
plugin.on('buttonPressed', (message) => {
    console.log('do something!')
})
```

### Version Tracking

Easily communicate new features with your users by keeping track of changes via the `plugma` CLI.

```bash
plugma version [patch|minor|major] -m "New feature"
```

#### Injecting Data

Using the `-i` or `-b` flag, Plugma will inject plugin verison data into the compiled `main` code defined in your manifest. so you can target documents and nodes created by past versions of your plugin.

```bash
plugma version -b
```

This includes:

- `figma.cilentStorage.setAsync()`
- `figma.root.setSharedPluginData()`
- `node.setSharedPluginData()`

#### Manifest.json

Plugma will look for a manifest file located at either `./` or `./public`.

## Installation

### Install as dev dependency

Install plugma as a dev dependency.

```bash
npm install plugma --save-dev
```

<!-- ### Setup manifest.json

To enable auto versioning on publish add the following property to your `manifest.json` file.

```jsonc
{
    // ...
    "build": "/usr/local/bin/node NODE_ENV=manifest plugma version patch"
}
``` -->

<!-- ## Path Preferences

Unfortunately for the time being you'll need to manually specify the locations of your `package.json` and `versions.json` file. This is due to bundling tools not supporting dynamic import paths.

For rollup, you can do the following:

```js
// ...
plugins: [
    nodeResolve(),
    json(),
    replace({
        'process.env.VERSIONS_PATH': JSON.stringify('./package.json'),
        'process.env.PKG_PATH': JSON.stringify('./versions.json')
    })
    // ...
]
``` -->

## Devlopment

To install:

```bash
npm install
```

To develop:

```bash
npm run dev
```

<!-- ## Configure

```js
// plugma.config.js

export default {
    whatsNewUI: true
}
``` -->
