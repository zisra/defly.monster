const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

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
		if (!name) {
			return await message.reply({
				content:
					'Please type in the title of a defly.io wiki article at <https://deflyio.fandom.com>',
				ephemeral: true,
			});
		}
		try {
			const res = await axios.get('https://deflyio.fandom.com/wiki/' + name);
			if (res.status == 200) {
				await message.reply('https://deflyio.fandom.com/wiki/' + name);
			} else {
				await message.reply(
					{
						content: 'Article not found. You can find one at <https://deflyio.fandom.com>',
						ephemeral: true,
					}
				);
			}
		} catch (err) {
			await message.reply({
				content: 'Article not found. You can find one at <https://deflyio.fandom.com>',
				ephemeral: true,
			}
			);
		}
	},
};
