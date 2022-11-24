const fs = require('fs');
const path = require('path');

async function commands(mode) {
	const commands = [];
	fs.readdirSync(path.join(process.cwd(), 'commands')).forEach((command) => {
		const commandData = require(path.join(process.cwd(), 'commands', command));

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
