import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import config from '../config.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('badges')
		.setDescription('Gets one or all badges')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('get')
				.setDescription('Gets a specific badge')
				.addIntegerOption((option) =>
					option
						.setName('badge')
						.setDescription('The badge to search for')
						.setRequired(true)
						.setMinValue(1)
						.setMaxValue(config.MAX_BADGES)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('random').setDescription('Gets a random badge')
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('all').setDescription('Gets all badges')
		),
	subcommands: {
		get: async (interaction) => {
			const badge = interaction.options.getInteger('badge');

			if (
				!badge ||
				parseInt(badge) < 1 ||
				parseInt(badge) > config.MAX_BADGES ||
				!parseInt(badge)
			) {
				return interaction.reply({
					content: `Please select a badge number: 1 - ${config.MAX_BADGES}`,
					ephemeral: true,
				});
			}
			const embed = new EmbedBuilder()
				.setTitle(`Defly.io badge ${badge}`)
				.setImage(`https://defly.io/img/badges/${badge}.png`)
				.setColor(config.EMBED.MAIN);

			await interaction.reply({ embeds: [embed] });
		},
		random: async (interaction) => {
			const badgeNumber = Math.floor(Math.random() * config.MAX_BADGES) + 1;
			const embed = new EmbedBuilder()
				.setTitle(`Defly.io badge ${badgeNumber}`)
				.setImage(`https://defly.io/img/badges/${badgeNumber}.png`)
				.setColor(config.EMBED.MAIN);

			await interaction.reply({ embeds: [embed] });
		},
		all: async (interaction, client) => {
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

			await interaction.reply({ embeds: [embed] });
		},
	},
};
