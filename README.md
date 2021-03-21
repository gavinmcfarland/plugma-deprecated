<p align="center">
    <a href="https://www.npmjs.com/package/plugma"><img src="https://img.shields.io/npm/v/plugma.svg"></a>
    <a href="https://travis-ci.org/limitlessloop/plugma"><img src="https://img.shields.io/travis/limitlessloop/plugma.svg"></a>  
</p>

# Plugma

Plugma is a small framework for creating Figma Plugins. It provides some features and syntastic sugar for making it easier to develop and maintain plugins.

## Example

Plugins are created using the following format.

```js
// code.ts
import plugma from 'plugma'

plugma((plugin) => {

    plugin.ui = {
		html: __html__,
		width: 250,
		height: 400
	}

    plugin.on('buttonPressed', () => {

    })

	return {
        'createRectangle': () => {

        },
        'createCircle': () => {

        }
	}
})
```

The framework provides a `plugin` reference which gives you the state of the `plugin` at any given time. This is useful to keep consistancey across different commands. If you ever need to make an exception, you can change the state of the plugin per command.

```js
// plugin properties

plugin.ui {
    html: __html,
    width: 250,
    height: 500
}
```

## Commands

With Plugma, commands can automatically show and post data for UIs without much extra setup. Each command has access to the state of the plugin, including the name of the command used to start it.

```js
'createRectangle': ({ui, command, version, data}) => {
    ui.show(data)
},
```

## Message Handling

There is a simple method for listening for messages from the UI using `plugin.on()`.

```js
plugin.on('buttonPressed', () => {

})
```

## Version Management

Not only does Plugma make it easier to communicate with your users about new features by keeping a version log, but it also makes it easy for you to target and make upgrades to nodes created by previous versions of your plugin.

```bash
plugma version patch
# Version updated to 1.0.2
```

Include actions for certain versions/changes?

```bash
plugma version patch -a upgradeRectangles
```

Show version log

```bash
plugma version major -s
```

**use cases**

1. Want to show changes every major version
2. Want to show certain features available with certain releases
3. Want to patch or upgrade from certain versions

## Configure

```js
// plugma.config.js

export default {
    whatsNewUI: true
}
```


## Devlopment

Currently this framework is bundled using `rollup` and for the front end it uses `svelte`. However it should be agnostic to work with any frontend framework.

To install:

```bash
npm install
```

To develop:

```bash
npm run dev
```

## Setup

Install plugma as a dev dependency.

```bash
npm install plugma --save-dev
```

## Using Rollup

For rollup, you'll need to replace the following

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
```