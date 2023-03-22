import {
	GuildFeature,
	GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';

import { getServers } from '../util/getServers.js';

export default {
	guildOnly: true,
	interaction: new SlashCommandBuilder()
		.setName('post-event')
		.setDescription(
			"Adds an upcoming defly.io tournament to the current server's events"
		)
		.setDMPermission(false),
	command: async (interaction) => {
		if (!interaction.guild.features.includes(GuildFeature.Community)) {
			return interaction.reply({
				content:
					'This guild is not a community, and therefore I cannot set events.',
				ephemeral: true,
			});
		}
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.ManageEvents
			)
		) {
			return interaction.reply({
				content: 'You do not have permissions to manage events',
				ephemeral: true,
			});
		}

		if (
			!interaction.guild.members.me.permissions.has(
				PermissionsBitField.Flags.ManageEvents
			)
		) {
			return interaction.reply({
				content: 'I do not have permissions to manage events.',
				ephemeral: true,
			});
		}

		const { event } = await getServers(1);
		if (new Date() - new Date(event.ts) > 0) {
			return interaction.reply({
				content: 'Event already occured.',
				ephemeral: true,
			});
		}

		try {
			const discordEvent = await interaction.guild.scheduledEvents.create({
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

			await interaction.reply(`Event posted: ${discordEvent}`);
		} catch (err) {
			console.log(err);
			await interaction.reply('Event failed', {
				ephemeral: true,
			});
		}
	},
};
