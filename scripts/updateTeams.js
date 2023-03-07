import axios from 'axios';
import fs from 'node:fs';

(async () => {
	const res = await axios.get('https://defly.monster/api/eliteTeams?version=2');
	fs.writeFileSync('./src/eliteTeams.json', JSON.stringify(res.data));
})();
