const {
	ButtonBuilder,
	ActionRowBuilder,
	EmbedBuilder,
	PermissionsBitField,
	ButtonStyle,
} = require('discord.js');
const config = require('../config.js');

module.exports = {
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
				.setURL('https://railway.app/project/' + process.env.RAILWAY_PROJECT_ID)
				.setLabel('Railway Project')
				.setStyle(ButtonStyle.Link), 
            new ButtonBuilder()
				.setURL('https://railway.app/project/' + process.env.RAILWAY_PROJECT_ID + '/service/' + process.env.RAILWAY_DEPLOYMENT_ID)
				.setLabel('Railway Deployment')
				.setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setURL('https://'+ process.env.RAILWAY_STATIC_URL)
                .setLabel('Preview Deploy')
				.setStyle(ButtonStyle.Link),
		);
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setURL(`https://github.com/${process.env.RAILWAY_GIT_REPO_OWNER}/${process.env.RAILWAY_GIT_REPO_NAME}/commit/${process.env.RAILWAY_GIT_COMMIT_SHA}`)
            .setLabel('Current commit')
			.setStyle(ButtonStyle.Link), 
        )
		await message.reply({ embeds: [embed], components: [row] });
	},
};
