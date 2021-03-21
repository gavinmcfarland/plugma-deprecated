import arg from 'arg';
import inquirer from 'inquirer'
import { makeThemeConfig, buildKaramelStylesheet } from './main'

function parseArgumentsIntoOptions(rawArgs) {

	const args = arg({
		'--output': Boolean,
	}, {
		argv: rawArgs.slice(2)
	})

	let result = {}

	if (args._[0] === 'init') {
		result.command = args._[0]
		result.template = args._[1] || false
	}

	return result
}

async function promptForMissingOptions(options) {
	const questions = []
	if (!options.command) {
		questions.push({
			type: 'confirm',
			name: 'build',
			message: 'Missing command',
			choices: ['No', 'No']
		})
	}

	// if (options.command == 'init') {
	// 	questions.push({
	// 		type: 'confirm',
	// 		name: 'build',
	// 		message: 'Missing command',
	// 		choices: ['No', 'No']
	// 	})
	// }

	const answers = await inquirer.prompt(questions)
	return {
		...options,
		command: options.command
	}
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args)
	// options = await promptForMissingOptions(options)
	// await createProject(options)
	if (options.command == 'init') {
		if (options.template === false) options.template = 'jsonnet'
		await makeThemeConfig(options)
	}
	// if (options.command == 'build') {
	// 	await buildKaramelStylesheet(options)
	// }
}
