import {
	EmbedBuilder,
	time,
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';

import config from '../config.js';
import dateParser from 'any-date-parser';

export default {
	arguments: false,
	description:
		'Sends the Discord timestamp for any given date. Useful for tournament dates. Defaults UTC.',
	interaction: new SlashCommandBuilder()
		.setName('time')
		.setDescription(
			'Sends the Discord timestamp for any given date. Useful for tournament dates. Defaults UTC.'
		)
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('The time to use')
				.setRequired(true)
		),
	command: async (message, args, client) => {
		const date = message.interaction ? args.input : args.join(' ');
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel('Supported formats')
				.setStyle(ButtonStyle.Link)
				.setURL(
					'https://github.com/kensnyder/any-date-parser#exhaustive-list-of-date-formats'
				)
		);
		if (!date) {
			return await message.reply({
				content: 'Date could not be parsed',
				ephemeral: true,
				components: [row],
			});
		}
		try {
			const outDate = dateParser.fromString(date);
			const embed = new EmbedBuilder()
				.addFields(
					config.TIME_FORMATS.map((format) => ({
						name: time(outDate, format),
						value: `\`${time(outDate, format)}\``,
					}))
				)
				// .setTitle(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
				.setTitle('Discord timestamp')
				.setColor(config.EMBED.MAIN);

			await message.reply({ embeds: [embed] });
		} catch (err) {
			await message.reply({
				content: 'Date could not be parsed',
				ephemeral: true,
				components: [row],
			});
		}
	},
};
