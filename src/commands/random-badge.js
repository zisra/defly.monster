const config = require('../config.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	arguments: false,
	description: 'Gets a random badge for premium users',
	command: async (message, args, client) => {
		const badgeNumber = Math.floor(Math.random() * 47) + 1;
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io badge ${badgeNumber}`)
			.setImage(`https://defly.io/img/badges/${badgeNumber}.png`)
			.setColor(config.EMBED.MAIN);

		await message.reply({ embeds: [embed] });
	},
};
