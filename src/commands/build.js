const {
	EmbedBuilder,
	AttachmentBuilder,
	SlashCommandBuilder,
} = require('discord.js');

const { generateUpgrades } = require('../util/generateUpgrades.js');
const config = require('../config.js');

module.exports = {
	arguments: ['build'],
	description: 'Sends a graphic for any chosen build',
	interaction: new SlashCommandBuilder()
		.setName('build')
		.setDescription('Gets a list of all badges for premium user')
		.addNumberOption((option) =>
			option
				.setName('build')
				.setDescription('The number combination to use for the image')
				.setRequired(true)
		),
	command: async (message, args, client) => {
		const build = message.interaction ? args.build : args[0];

		let added = build.split('');

		if (
			build.length !== 7 ||
			added.reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32 ||
			!build
		) {
			return message.reply({
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

		message.reply({ embeds: [embed], files: [file] });
	},
};
