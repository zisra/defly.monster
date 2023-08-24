import { ofetch } from 'ofetch';

import database from '../src/database.js';

(async () => {
	const res = await ofetch('https://defly.monster/api/eliteTeams?version=2');
	database.set('elite-teams', res.data);
})();
