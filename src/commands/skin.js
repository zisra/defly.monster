const {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	SlashCommandBuilder,
} = require('discord.js');
const Sentry = require('@sentry/node');

const config = require('../config.js');
const fs = require('fs');

module.exports = {
	arguments: ['skin-id'],
	description: 'Sends the file for any current in-game skin',
	interaction: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Sends the file for any current in-game skin')
		.addIntegerOption((option) =>
			option
				.setName('id')
				.setDescription('The skin ID to use')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(config.MAX_SKINS)
		),
	command: async (message, args, client) => {
		const skin = message.interaction ? args.id : args[0];

		if (
			!parseInt(skin) ||
			parseInt(skin) > config.MAX_SKINS ||
			parseInt(skin) < 1
		) {
			return message.reply({
				ephemeral: true,
				content: `Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** <https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197> **`,
			});
		}
		try {
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('getimages')
					.setLabel('Get images')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setLabel('All skins')
					.setStyle(ButtonStyle.Link)
					.setURL(
						'https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197'
					)
			);
			message.reply({
				content: `Defly.io skin ID: ${skin}`,
				files: [
					{
						attachment: `./src/skins/skin${skin}.txt`,
						name: `skin${skin}.txt`,
						description: `Defly.io skin ID: ${skin}`,
					},
				],
				components: [row],
			});
		} catch (err) {
			Sentry.captureException(err);
			message.reply({
				ephemeral: true,
				content: `Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** <https://docs.google.com/spreadsheets/d/${config.SPREADSHEET_ID}/edit#gid=757313197> **`,
			});
		}
	},
};
