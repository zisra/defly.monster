const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
	arguments: false,
	description: 'Gets a list of all badges for premium user',
	interaction: new SlashCommandBuilder()
		.setName('badges')
		.setDescription('Gets a list of all badges for premium user'),
	command: async (message, args, client) => {
		const embed = new EmbedBuilder()
			.setTitle('Defly.io badges')
			.setDescription(
				client.guilds.cache
					.get('877177181413994496')
					.emojis.cache.map((e) => e.toString())
					.sort()
					.join(' ')
			)
			.setColor(config.EMBED.MAIN);

		await message.reply({ embeds: [embed] });
	},
};
