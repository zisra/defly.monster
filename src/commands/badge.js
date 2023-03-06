import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import config from '../config.js';

export default {
	arguments: ['badge'],
	description: 'Gets info on a specific badge',
	interaction: new SlashCommandBuilder()
		.setName('badge')
		.setDescription('Gets info on a specific badge')
		.addIntegerOption((option) =>
			option
				.setName('badge')
				.setDescription('The badge to search for')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(47)
		),
	command: async (message, args, client) => {
		const badge = message.interaction ? args.badge : args[0];

		if (
			!badge ||
			parseInt(badge) < 1 ||
			parseInt(badge) > 47 ||
			!parseInt(badge)
		) {
			return message.reply({
				content: 'Please select a badge number: 1 - 47',
				ephemeral: true,
			});
		}
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io badge ${badge}`)
			.setImage(`https://defly.io/img/badges/${badge}.png`)
			.setColor(config.EMBED.MAIN);

		await message.reply({ embeds: [embed] });
	},
};
