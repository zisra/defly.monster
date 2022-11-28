const Response = require('../util/apiResponse.js');
const config = require('../config.js');

const { WebhookClient, EmbedBuilder } = require('discord.js');

module.exports = async (req, res) => {
	try {

		if(!req.query.feedback ) return Response(res,{
			type: 'missingParameter',
			data: 'Missing JSON body feedback parameter'
		})

		const webhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK });

		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setDescription(req.body.feedback)
			.setTimestamp();
	
		await webhook.send({
			embeds: [embed],
			threadId: '1037079331710709882',
		});
	
		Response(res, {type: 'success'})
	} catch(err) {
		console.error(err);
		new Response(res,{
			type: 'serverError',
			err, 
		})
	}
};
