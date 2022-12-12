const { EmbedBuilder, time } = require('discord.js');
const config = require('../config.js');
const dateParser = require('any-date-parser');

module.exports = {
	arguments: false,
	description:
		'Sends the Discord timestamp for any given date. Useful for tournament dates. Defaults UTC.',
	command: async (message, args, client) => {
		if (!args[0]) {
			await message.reply(
				'Date could not be parsed. View a list of supported date formats: <https://github.com/kensnyder/any-date-parser#exhaustive-list-of-date-formats>'
			);
		} else {
			try {
				const date = dateParser.fromString(args.join(' '));
				const embed = new EmbedBuilder()
					.addFields(
						config.TIME_FORMATS.map((format) => ({
							name: time(date, format),
							value: `\`${time(date, format)}\``,
						}))
					)
					// .setTitle(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
					.setTitle('Discord timestamp')
					.setColor(config.EMBED.MAIN);

				await message.reply({ embeds: [embed] });
			} catch (err) {
				console.error(err);
				await message.reply(
					'Date could not be parsed. View a list of supported date formats: <https://github.com/kensnyder/any-date-parser#exhaustive-list-of-date-formats>'
				);
			}
		}
	},
};
