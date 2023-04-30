import {
	AttachmentBuilder,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('asset')
		.setDescription('View a game asset from the spritesheet')
		.addStringOption((option) =>
			option
				.setName('asset')
				.setDescription('The name of the asset to search for')
				.setAutocomplete(true)
				.setRequired(true)
		),
	command: async (interaction) => {
		const asset = interaction.options.getString('asset');
		const image = new AttachmentBuilder(`./src/images/${asset}`);
		const embed = new EmbedBuilder()
			.setTitle(`Defly.io asset`)
			.setImage(`attachment://${asset}`)
			.setColor(config.EMBED.MAIN);

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
