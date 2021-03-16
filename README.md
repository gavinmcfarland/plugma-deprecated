# Poncho

Poncho is a small framework for creating Figma Plugins. It provides some syntastic sugar for making it easier to develop and maintain plugins.

## Creating a plugin

To get started, plugins are created in the following format.

```js
export default (plugin) => {

	return {
		'createRectangle': () => {

		},
		'createCircle': () => {

		}
	}
}
```

Figma plugins either run as a main function with no menu commands, or with one or more menu commands. Therefore the Poncho framework expects either an anonymous function, or one or more named functions.

## The `plugin` reference

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

With Poncho, commands can automatically show and post data for UIs without much extra setup. Each command has access to the state of the plugin, including the name of the command used to start it.

```js
'createRectangle': ({ui, command, version, data}) => {
    ui.show()
},
```

## Events

The plugin can listen for events from the UI with `plugin.on()`.

```js
plugin.on('buttonPressed', () => {

})
```

## Version

Poncho tries to make managing version control of your plugin a little easier.


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