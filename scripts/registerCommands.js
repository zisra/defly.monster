import fs from 'node:fs';

import { REST, Routes } from 'discord.js';

import config from '../src/config.js';

const commands = [];

const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const { default: command } = await import(`../src/commands/${file}`);
	if (!command.adminOnly) {
		commands.push(command.interaction.toJSON());
	}
}

const rest = new REST({ version: '10' }).setToken(config.SECRETS.DISCORD_TOKEN);

(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		const data = await rest.put(
			Routes.applicationCommands(config.SECRETS.APP_ID),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();
