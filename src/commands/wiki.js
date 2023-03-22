import axios from 'axios';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	SlashCommandBuilder,
} from 'discord.js';

export default {
	interaction: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Gets a given wiki article from the defly.io wiki')
		.addStringOption((option) =>
			option
				.setName('name')
				.setDescription('The name of the article to send')
				.setRequired(true)
		),
	command: async (interaction, args) => {
		const name = args.name;
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel('Wiki fandom')
				.setStyle(ButtonStyle.Link)
				.setURL('https://deflyio.fandom.com/')
		);

		if (!name) {
			return await interaction.reply({
				content: 'Article not found.',
				ephemeral: true,
				components: [row],
			});
		}
		try {
			const res = await axios.get('https://deflyio.fandom.com/wiki/' + name);
			if (res.status === 200) {
				await interaction.reply('https://deflyio.fandom.com/wiki/' + name);
			} else {
				await interaction.reply({
					content: 'Article not found.',
					components: [row],
					ephemeral: true,
				});
			}
		} catch (err) {
			await interaction.reply({
				content: 'Article not found.',
				components: [row],
				ephemeral: true,
			});
		}
	},
};
