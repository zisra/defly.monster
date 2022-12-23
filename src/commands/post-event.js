const {
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
	GuildFeature,
	PermissionsBitField,
	SlashCommandBuilder
} = require('discord.js');
const config = require('../config.js');
const { getServers } = require('../util/getServers.js');

module.exports = {
	arguments: false,
	description:
		"Adds an upcoming defly.io tournament to the current server's events.",
	interaction: new SlashCommandBuilder()
		.setName('post-event')
		.setDescription("Adds an upcoming defly.io tournament to the current server's events"),
	command: async (message, args, client) => {
		if (!message.guild.features.includes(GuildFeature.Community)) {
			return message.reply(
				'This guild is not a community, and therefore I cannot set events. ',
				{
					ephemeral: true,
				}
			);
		}
		if (
			!message.member.permissions.has(PermissionsBitField.Flags.ManageEvents)
		) {
			return message.reply('You do not have permissions to manage events', {
				ephemeral: true,
			});
		}

		if (
			!message.guild.members.me.permissions.has(
				PermissionsBitField.Flags.ManageEvents
			)
		) {
			return message.reply('I do not have permissions to manage events.', {
				ephemeral: true,
			});
		}

		const { event } = await getServers(1);
		if (new Date() - new Date(event.ts) > 0) {
			return message.reply('Event already occured.', {
				ephemeral: true,
			});
		}

		try {
			const discordEvent = await message.guild.scheduledEvents.create({
				name: event.title,
				scheduledStartTime: new Date(event.ts),
				scheduledEndTime: new Date(event.ts + event.duration * 1000 * 60 * 60),
				description:
					event.details
						.replaceAll('\r', '')
						.replaceAll('➡️', '')
						.replaceAll('⬅️', '')
						.replaceAll('ㅤ', '')
						.trim()
						.substring(0, 997) + '...',
				entityType: GuildScheduledEventEntityType.External,
				privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
				entityMetadata: {
					location: 'https://defly.io/',
				},
			});
		} catch (err) {
			console.log(err);
			await message.reply('Event failed', {
				ephemeral: true,
			});
		}
		await message.reply(`Event: ${discordEvent}`);
	},
};
