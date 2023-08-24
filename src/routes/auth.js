import { ofetch } from 'ofetch';

import config from '../config.js';
import Response from '../util/apiResponse.js';

export default async (req, res) => {
	const code = req.query.code;

	if (code) {
		try {
			const parameters = new URLSearchParams();
			parameters.append('client_id', config.SECRETS.APP_ID);
			parameters.append('client_secret', config.SECRETS.CLIENT_SECRET);
			parameters.append('grant_type', 'authorization_code');
			parameters.append('code', code);
			parameters.append(
				'redirect_uri',
				config.SECRETS.NODE_ENV === 'production'
					? 'https://defly.monster/api/auth/'
					: 'http://localhost:3000/api/auth/'
			);
			parameters.append('scope', 'identity');

			const authData = await ofetch(
				'https://discord.com/api/oauth2/token',
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					method: 'post',
					body: parameters.toString()
				}
			);
			const auth = authData.data;

			const userData = await ofetch('https://discord.com/api/users/@me', {
				headers: {
					Authorization: `Bearer ${auth.access_token}`,
				},
			});
			const user = userData.data;

			const isAdmin = !!config.SECRETS.ADMINS.split(',').find(
				(usr) => usr === user.id
			);

			req.session.accessToken = auth.access_token;
			req.session.refreshToken = auth.refresh_token;
			req.session.userId = user.id;
			req.session.username = user.username;
			req.session.isAdmin = isAdmin;

			res.redirect('/dashboard');
		} catch (err) {
			Response(res, {
				type: 'serverError',
				err,
			});
		}
	} else {
		return Response(res, {
			type: 'unauthorized',
		});
	}
};
