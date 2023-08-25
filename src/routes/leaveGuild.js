import Response from '../util/apiResponse.js';
import config from '../config.js';
import { REST, Routes } from 'discord.js';

export default async (req, res) => {
    if (req.session.isAdmin) {
        try {
            const rest = new REST({ version: '9' }).setToken(
                config.SECRETS.DISCORD_TOKEN
            );
            const response = await rest.delete(Routes.userGuild(req.params.id));

            new Response(res, {
                type: 'success',
                message: 'Successfully left guild',
                data: response,
            });
        } catch (err) {
            new Response(res, {
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
