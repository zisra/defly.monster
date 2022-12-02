const axios = require('axios');
const config = require('../config.js');

module.exports = {
	arguments: ['article-name'],
	description: 'Gets a given wiki article from the defly.io wiki',
	command: async (message, args, client) => {
		if (!args.length) {
			await message.reply(
				'Please type in the title of a defly.io wiki article at <https://deflyio.fandom.com>'
			);
		} else {
			const title = args.join(' ');
			try {
				const res = await axios.get('https://deflyio.fandom.com/wiki/' + title);
				if (res.status == 200) {
					await message.reply('https://deflyio.fandom.com/wiki/' + title);
				} else {
					await message.reply(
						'Article not found. You can find one at <https://deflyio.fandom.com>'
					);
				}
			} catch (err) {
				await message.reply(
					'Article not found. You can find one at <https://deflyio.fandom.com>'
				);
			}
		}
	},
};
