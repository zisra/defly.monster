import { ofetch } from 'ofetch';

export async function getServers(mode) {
	const res = await ofetch('https://s.defly.io/servers?m=' + mode);
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
