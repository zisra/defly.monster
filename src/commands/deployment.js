import {
	ButtonBuilder,
	ActionRowBuilder,
	EmbedBuilder,
	PermissionsBitField,
	ButtonStyle,
} from 'discord.js';

import config from '../config.js';

export default {
	arguments: false,
	description: 'Get deploy info',
	adminOnly: true,
	command: async (message, args, client) => {
		const invite = client.generateInvite({
			permissions: PermissionsBitField.Flags.Administrator,
			scopes: ['bot'],
		});
		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setTitle('Deployment');

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(
					'https://railway.app/project/' + config.SECRETS.RAILWAY_PROJECT_ID
				)
				.setLabel('Railway Project')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(
					'https://railway.app/project/' +
						config.SECRETS.RAILWAY_PROJECT_ID +
						'/service/' +
						config.SECRETS.RAILWAY_SERVICE_ID
				)
				.setLabel('Railway Service')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL(
					'https://railway.app/project/' +
						config.SECRETS.RAILWAY_PROJECT_ID +
						'/service/' +
						config.SECRETS.RAILWAY_SERVICE_ID +
						'?id=' +
						config.SECRETS.RAILWAY_DEPLOYMENT_ID
				)
				.setLabel('Preview Deployment')
				.setStyle(ButtonStyle.Link)
		);

		const row2 = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setURL(
					`https://github.com/${config.SECRETS.RAILWAY_GIT_REPO_OWNER}/${config.SECRETS.RAILWAY_GIT_REPO_NAME}/commit/${config.SECRETS.RAILWAY_GIT_COMMIT_SHA}`
				)
				.setLabel('Current commit')
				.setStyle(ButtonStyle.Link)
		);

		await message.reply({ embeds: [embed], components: [row, row2] });
	},
};
