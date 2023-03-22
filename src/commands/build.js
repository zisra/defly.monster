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

		const added = build.split('');

		if (
			build.length !== 7 ||
			added.reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32 ||
			!build
		) {
			return interaction.reply({
				content:
					'Please enter a valid build that adds up to 32. Example: 8888000',
				ephemeral: true,
			});
		}

		const upgrades = await generateUpgrades(build, 'png');

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
