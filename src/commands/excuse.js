const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
	arguments: false,
	description:
		'You died in defly.io and need something to cover up your shame? This command has you covered, because it gives you a random excuse for your comfort!',
	command: async (message, args, client) => {
		const excuse =
			config.EXCUSES[Math.floor(Math.random() * config.EXCUSES.length)];
		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setTitle('Your random excuse')
			.setDescription(excuse);
		message.reply({ embeds: [embed] });
	},
};
