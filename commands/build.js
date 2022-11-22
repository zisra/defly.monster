const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const { generateUpgrades } = require('../util/generateUpgrades.js');
const config = require('../config.js');

module.exports = {
	arguments: ['build'],
	description: 'Sends a graphic for any chosen build',
	command: async (message, args, client) => {
		let added = args[0].split('');
		if (
			args[0].length !== 7 ||
			added.reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32 ||
			!args[0]
		) {
			message.reply('Please enter a valid build. Example: 4727048');
		} else {
			const upgrades = await generateUpgrades(args[0], 'png');

			const file = new AttachmentBuilder(upgrades.data, {
				name: 'upgrades.png',
			});

			const embed = new EmbedBuilder()
				.setTitle(args[0])
				.setImage('attachment://upgrades.png')
				.setColor(config.EMBED.MAIN);

			message.reply({ embeds: [embed], files: [file] });
		}
	},
};
