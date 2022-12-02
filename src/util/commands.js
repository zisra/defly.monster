const fs = require('fs');

async function commands(mode) {
	const commands = [];
	fs.readdirSync('./src/commands').forEach((command) => {
		const commandData = require('../commands/' + command);

		commands.push({
			name: command.replace('.js', ''),
			arguments: commandData?.arguments ?? null,
			description: commandData.description,
			adminOnly: commandData?.adminOnly ?? false,
		});
	});
	return commands;
}

exports.commands = commands;
