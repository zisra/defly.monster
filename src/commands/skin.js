const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Sentry = require('@sentry/node');
const config = require('../config.js');

module.exports = {
	arguments: ['skin-id'],
	description:
		'Sends the file for a current in-game skin. Supports almost every skin.',
	command: async (message, args, client) => {
		if (!args[0] || args[0] > config.MAX_SKINS) {
			message.reply(
				`Please provide a valid skin ID: 1-${config.MAX_SKINS}\nYou can get the skin ID here:** <https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197> **`
			);
		} else {
			const skin = args[0];
			try {
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('getimages')
						.setLabel('Get images')
						.setStyle(ButtonStyle.Primary)
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
				message.reply(
					`Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197 **`
				);
			}
		}
	},
};
