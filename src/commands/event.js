const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const config = require('../config.js');
const { getServers } = require('../util/getServers.js');

module.exports = {
	arguments: false,
	description: 'Find out what tournaments are coming up',
	interaction: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Find out what tournaments are coming up'),
	command: async (message, args, client) => {
		const serverRes = await getServers(1);
		if (!serverRes.event) {
			await message.reply('There is no event at the moment.');
		} else {
			const embed = new EmbedBuilder()
				.setDescription(serverRes.event.details)
				.setTitle(serverRes.event.title)
				.setTimestamp(new Date(serverRes.event.date))
				.setColor(config.EMBED.MAIN);
			await message.reply({ embeds: [embed] });
		}
	},
};
