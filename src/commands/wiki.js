const axios = require('axios');
const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

const config = require('../config.js');

module.exports = {
	arguments: ['article-name'],
	description: 'Gets a given wiki article from the defly.io wiki',
	interaction: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Gets a given wiki article from the defly.io wiki')
		.addStringOption((option) =>
			option
				.setName('name')
				.setDescription('The name of the article to send')
				.setRequired(true)
		),
	command: async (message, args, client) => {
		const name = message.interaction ? args.name : args.join(' ');

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel('Wiki fandom')
				.setStyle(ButtonStyle.Link)
				.setURL('https://deflyio.fandom.com/')
		);

		if (!name) {
			return await message.reply({
				content: 'Article not found.',
				ephemeral: true,
				components: [row],
			});
		}
		try {
			const res = await axios.get('https://deflyio.fandom.com/wiki/' + name);
			if (res.status == 200) {
				await message.reply('https://deflyio.fandom.com/wiki/' + name);
			} else {
				await message.reply({
					content: 'Article not found.',
					components: [row],
					ephemeral: true,
				});
			}
		} catch (err) {
			await message.reply({
				content: 'Article not found.',
				components: [row],
				ephemeral: true,
			});
		}
	},
};
