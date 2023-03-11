import Response from '../util/apiResponse.js';
import config from '../config.js';
import { WebhookClient, EmbedBuilder, escapeMarkdown } from 'discord.js';

export default async (req, res) => {
	try {
		if (!req.body.feedback)
			return Response(res, {
				type: 'missingParameter',
				data: 'Missing feedback JSON body parameter',
			});

		if (req.body.feedback.length < 20)
			return Response(res, {
				type: 'invalidParameter',
				data: 'Feedback parameter must be at least 20 characters',
			});

		const webhook = new WebhookClient({ url: config.SECRETS.FEEDBACK_WEBHOOK });

		const embed = new EmbedBuilder()
			.setColor(config.EMBED.MAIN)
			.setDescription(escapeMarkdown(req.body.feedback).substring(0, 500))
			.setTimestamp();

		await webhook.send({
			embeds: [embed],
			threadId: '1037079331710709882',
		});

		Response(res, { type: 'success' });
	} catch (err) {
		console.error(err);
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
