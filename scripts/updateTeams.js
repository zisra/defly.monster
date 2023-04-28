import axios from 'axios';

import database from '../src/database.js';

(async () => {
	const res = await axios.get('https://defly.monster/api/eliteTeams?version=2');
	database.set('elite-teams', res.data);
})();
