import Sentry from '@sentry/node';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';

export default {
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
	command: async (interaction, args) => {
		const skin = args.id;

		if (
			!parseInt(skin) ||
			parseInt(skin) > config.MAX_SKINS ||
			parseInt(skin) < 1
		) {
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setLabel('Skin IDs')
					.setStyle(ButtonStyle.Link)
					.setURL(
						'https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197'
					)
			);
			return interaction.reply({
				ephemeral: true,
				content: `Please provide a valid skin ID: 26-${config.MAX_SKINS}.`,
				components: [row],
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
			interaction.reply({
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
			interaction.reply({
				ephemeral: true,
				content: `Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** <https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197> **`,
			});
		}
	},
};
