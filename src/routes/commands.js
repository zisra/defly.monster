import Response from '../util/apiResponse.js';
import { commands } from '../util/commands.js';

export default async (req, res) => {
	try {
		const commandList = await commands();
		res.json(commandList.filter((i) => !i.adminOnly));
	} catch (err) {
		new Response(res, {
			type: 'serverError',
			err,
		});
	}
};
