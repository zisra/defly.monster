const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	SlashCommandBuilder,
} = require('discord.js');

const config = require('../config.js');
const { commands } = require('../util/commands.js');
const e = require('express');

module.exports = {
	arguments: false,
	description: 'Gets a list of all commands',
	interaction: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gets a list of all commands'),
	command: async (message, args, client) => {
		const botCommands = await commands();
		let embed;

		if (!message.interaction) {
			embed = new EmbedBuilder()
				.setTitle('Defly.io Monster | Commands')
				.setDescription(
					botCommands
						.filter((i) => !i.adminOnly)
						.map(
							(i) =>
								`\`d?${i.name}${
									i.arguments
										? ' ' + i.arguments.map((i) => `<${i}>`).join(' ')
										: ''
								}\`: ${i.description}`
						)
						.join('\n')
				)
				.setColor(config.EMBED.MAIN);
		} else {
			embed = new EmbedBuilder()
				.setTitle('Defly.io Monster | Commands')
				.setDescription(
					client.application.commands.cache
						.map((i) => `</${i.name}:${i.id}>: ${i.description}`)
						.join('\n')
				)
				.setColor(config.EMBED.MAIN);
		}
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(`https://defly.monster/`)
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
		await message.reply({ embeds: [embed], components: [row] });
	},
};
