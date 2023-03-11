import fs from 'node:fs';

import axios from 'axios';

(async () => {
	const res = await axios.get('https://defly.monster/api/eliteTeams?version=2');
	fs.writeFileSync('./src/eliteTeams.json', JSON.stringify(res.data));
})();
