import fs from 'fs';

export async function commands(mode) {
	const commands = [];
	const commandFiles = fs.readdirSync('./src/commands');

	// convert to .map with promise.all
	for (const file of commandFiles) {
		const { default: commandData } = await import('../commands/' + file);

		commands.push({
			name: file.replace('.js', ''),
			arguments: commandData?.arguments ?? null,
			description: commandData.description,
			adminOnly: commandData?.adminOnly ?? false,
		});
	}

	return commands;
}
