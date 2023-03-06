import { REST, Routes } from 'discord.js';
import fs from 'fs';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

const commands = [];

const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../src/commands/${file}`);
	if (!command.adminOnly) {
		commands.push(command.interaction.toJSON());
	}
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();
