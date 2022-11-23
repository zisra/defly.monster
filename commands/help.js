const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	PermissionsBitField,
} = require('discord.js');

const config = require('../config.js');
const { commands } = require('../util/commands.js');

module.exports = {
	arguments: false,
	description: 'Gets a list of all commands',
	command: async (message, args, client) => {
		const invite = client.generateInvite({
			permissions: PermissionsBitField.Flags.Administrator,
			scopes: ['bot'],
		});

		const botCommands = await commands();

		const embed = new EmbedBuilder()
			.setTitle('Defly Overflow | Commands')
			.setDescription(
				botCommands
					.filter(i=>!i?.adminOnly)
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
