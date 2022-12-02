const axios = require('axios');

async function getServers(mode) {
	let res = await axios.get('https://s.defly.io/servers?m=' + mode);
	if (typeof res.data === 'string') {
		const servers = res.data.split('event=');
		return {
			servers: JSON.parse(servers[0]),
			event: JSON.parse(servers[1]),
		};
	} else {
		return {
			servers: res.data,
		};
	}
}
exports.getServers = getServers;
