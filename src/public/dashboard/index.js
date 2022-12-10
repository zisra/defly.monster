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

			output.push(
				'<b>Bot status:</b> ' + (stats.isReady ? 'Online' : 'Offline')
			);
			output.push(
				'<b>Online since:</b> ' +
					relativeTime.format(stats.uptime / 1000 / 60 / 60, 'hour')
			);
			output.push('<b>Total guilds:</b> ' + stats.guildCount);

			output.push(`<table>
			<tr>
			  <th></th>
			  <th>Name</td>
			  <th>Members</td>
			  <th>Guild</td>
			  <th>Owner</td>			  
			  <th>Age</td>
			  <th>Joined at</td>
			</tr>
			${stats.guilds
				.sort((a, b) => b.memberCount - a.memberCount)
				.map((guild) => {
					return `
				<tr>
					<td><img src="${guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`: 'https://cdn.discordapp.com/embed/avatars/1.png'}" width="30px;"</td> 
					<td>${guild.name}</td>
					<td>${guild.memberCount}</td>
					<td><a href="https://discord.com/channels/${guild.id}">${guild.id}</a></td>
					<td><a href="https://discord.com/users/${guild.owner}">${guild.owner}</a></td>
					<td>${new Date(guild.createdAt).toLocaleDateString()}</td>
					<td>${new Date(guild.joinedAt).toLocaleDateString()}</td>
				</tr>`;
				})
				.join('')}
		  </table>`);

			dashboard.innerHTML = output.join('<br />');
		} else {
			dashboard.innerHTML = 'Dashboard (WIP)';
		}
	}
};
