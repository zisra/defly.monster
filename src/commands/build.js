import {
	AttachmentBuilder,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';
import { generateUpgrades } from '../util/generateUpgrades.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('build')
		.setDescription('Gets a list of all badges for premium user')
		.addStringOption((option) =>
			option
				.setName('build')
				.setDescription('The number combination to use for the image')
				.setRequired(true)
				.setMaxLength(7)
				.setMinLength(7)
		),
	command: async (interaction, args) => {
		const build = args.build;

		let upgrades;

		try {
			upgrades = await generateUpgrades(build, 'png');
		} catch (err) {
			return interaction.reply({
				content: `${err.message}. Example: 8888000`,
				ephemeral: true,
			});
		}

		const file = new AttachmentBuilder(upgrades.data, {
			name: 'upgrades.png',
		});

		const embed = new EmbedBuilder()
			.setTitle(build)
			.setImage('attachment://upgrades.png')
			.setColor(config.EMBED.MAIN);

		interaction.reply({ embeds: [embed], files: [file] });
	},
};
