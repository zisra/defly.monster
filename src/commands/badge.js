const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
	arguments: ['badge'],
	description: 'Gets info on a specific badge',
	command: async (message, args, client) => {
		if (!args[0] || args[0] < 1 || args[0] > 47)
			return message.reply(`Please select a badge number: 1 - 47`);
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io badge ${args[0]}`)
			.setImage(`https://defly.io/img/badges/${args[0]}.png`)
			.setColor(config.EMBED.MAIN);

		await message.reply({ embeds: [embed] });
	},
};
