import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
	return copy(options.templateDirectory, options.targetDirectory, {
		clobber: false
	})
}

// export async function buildKaramelStylesheet(options) {
// 	// build()
// 	console.log('%s Files built', chalk.green.bold('DONE'))
// 	return true
// }

export async function buildKaramelStylesheet() {
	buildPostCSS('./src/styles/main.css', './dist/karamel/index.css')
	console.log('%s Karamel stylsheet created', chalk.green.bold('DONE'))
	return true
}

export async function makeThemeConfig(options) {

	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
	}

	const currentFileUrl =
		import.meta.url
	const templateDir = path.resolve(
		new URL(currentFileUrl).pathname,
		'../templates',
		options.template.toLowerCase()
	)
	options.templateDirectory = templateDir

	try {
		await access(templateDir, fs.constants.R_OK)
	} catch (err) {
		console.error('%s Invalid template name', chalk.red.bold('ERROR'))
		process.exit(1)
	}

	// console.log('Copy project files')
	await copyTemplateFiles(options)

	console.log('%s Blank theme config created', chalk.green.bold('DONE'))
	return true
}

export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
	}

	const currentFileUrl =
		import.meta.url
	const templateDir = path.resolve(
		new URL(currentFileUrl).pathname,
		'../../templates',
		options.template.toLowerCase()
	)
	options.templateDirectory = templateDir

	try {
		await access(templateDir, fs.constants.R_OK)
	} catch (err) {
		console.error('%s Invalid template name', chalk.red.bold('ERROR'))
		process.exit(1)
	}

	// console.log('Copy project files')
	await copyTemplateFiles(options)

	console.log('%s Blank theme config created', chalk.green.bold('DONE'))
	return true
}






// Function which adds new semver to versions file
export async function addVersion(options) {

}
