import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gets a list of all commands'),
	command: async (interaction, client) => {
		const embed = new EmbedBuilder()
			.setTitle('Defly.io Monster | Commands')
			.setDescription(
				client.application.commands.cache
					.map(
						(command) =>
							`</${command.name}:${command.id}>: ${command.description}`
					)
					.join('\n')
			)
			.setColor(config.EMBED.MAIN);

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL('https://defly.monster/')
				.setLabel('Visit website')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(config.INVITE_URL)
				.setLabel('Invite Bot')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(`https://discord.gg/${config.SUPPORT_GUILD}`)
				.setLabel('Join support')
				.setStyle(ButtonStyle.Link)
		);
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};
