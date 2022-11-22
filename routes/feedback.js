const config = require('../config.js');
const { WebhookClient, EmbedBuilder } = require('discord.js');

module.exports = async (req, res) => {
	const webhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK });

	const embed = new EmbedBuilder()
		.setColor(config.EMBED.MAIN)
		.setDescription(req.body.feedback)
		.setTimestamp();

	await webhook.send({
		embeds: [embed],
		threadId: '1037079331710709882',
	});

	res.json({
		status: 'success',
	});
};
