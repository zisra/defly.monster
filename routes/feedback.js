const config = require('../config.js');
const { WebhookClient, EmbedBuilder } = require('discord.js');

module.exports = async (req, res) => {
	try {
		const webhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK });

		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setDescription(req.body.feedback)
			.setTimestamp();
	
		await webhook.send({
			embeds: [embed],
			threadId: '1037079331710709882',
		});
	
		res.status(200);
		res.json({
			success: false,
			message: 'No skin ID given',
		});
	} catch {
		res.status(500);
        res.json({
            success: false,
            message: 'Something went wrong',
        });
	}
};
