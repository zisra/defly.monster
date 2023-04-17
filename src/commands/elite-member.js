import { EmbedBuilder, SlashCommandBuilder, escapeMarkdown } from 'discord.js';

import config from '../config.js';
import { eliteDefuse } from '../util/eliteDefuse.js';
import { eliteTeams } from '../util/eliteTeams.js';

function searchPlayer(data, id) {
	for (const key of Object.keys(data)) {
		const team = data[key];
		const player = team.find((player) => player.note === id.toString());
		if (player) {
			return {
				team: key,
				...player,
			};
		}
	}
}

export default {
	interaction: new SlashCommandBuilder()
		.setName('elite-member')
		.setDescription(
			'See if a user is an elite member, and which team they are on.'
		)
		.addUserOption((option) =>
			option
				.setRequired(true)
				.setName('user')
				.setDescription('The user to check.')
		),
	command: async (interaction, args) => {
		const user = args.user;

		const defuseMembers = await eliteDefuse();
		const teamMembers = await eliteTeams();

		const defuse = searchPlayer(defuseMembers, user);
		const team = searchPlayer(teamMembers, user);

		if (!defuse && !team) {
			return interaction.reply({
				content: `<@${user}> is not an elite member.`,
				ephemeral: true,
			});
		}

		const embed = new EmbedBuilder();
		embed.setColor(config.EMBED.MAIN);
		embed.setDescription(`<@${user}> is on the following elite teams:`);

		if (defuse) {
			embed.addFields({
				name: 'Defuse elites',
				value: `${
					config.ELITE_DEFUSE_MODE.TEAMS[defuse.team].name
				} - ${escapeMarkdown(defuse.value)}`,
			});
		}

		if (team) {
			embed.addFields({
				name: 'Teams elites',
				value: `${config.ELITE_TEAMS_MODE.TEAMS[team.team].name} - ${escapeMarkdown(team.value)}`,
			});
		}

		return interaction.reply({
			embeds: [embed],
		});
	},
};
