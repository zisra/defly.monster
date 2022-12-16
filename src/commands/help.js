const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	PermissionsBitField,
	SlashCommandBuilder,
} = require('discord.js');

const config = require('../config.js');
const { commands } = require('../util/commands.js');

module.exports = {
	arguments: false,
	description: 'Gets a list of all commands',
	interaction: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gets a list of all commands'),
	command: async (message, args, client) => {
		const invite = client.generateInvite({
			permissions: PermissionsBitField.Flags.Administrator,
			scopes: ['bot', 'applications.commands'],
		});

		const botCommands = await commands();
		const embed = new EmbedBuilder()
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
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(`https://defly.monster/`)
				.setLabel('Visit website')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(invite)
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
