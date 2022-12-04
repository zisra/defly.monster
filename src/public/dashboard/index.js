const login = document.getElementById('login');
const logout = document.getElementById('logout');
const userData = document.getElementById('user-data');
const textarea = document.getElementById('editor');
const dashboard = document.getElementById('dashboard');

window.onload = async () => {
	const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	const data = await fetch('/session');
	const res = await data.json();
	if (res.accessToken) {
		login.classList.add('hidden');
		logout.classList.remove('hidden');
		userData.innerHTML = `Welcome, ${res.username}! User status: ${
			res.isAdmin ? 'Admin' : 'Regular'
		}`;
		if (res.isAdmin) {
			const data = await fetch('/api/stats');
			const stats = await data.json();
			let output = [];

			output.push('Bot status: ' + (stats.isReady ? 'Online' : 'Offline'));
			output.push('Online since: ' + relativeTime.format(stats.uptime / 1000 / 60 / 60, 'hour'));
			output.push('Total guilds: ' + stats.guildCount)

			dashboard.innerHTML = output.join('<br />');
		} else {
			dashboard.innerHTML = 'Dashboard (WIP)';
		}
	}
};
