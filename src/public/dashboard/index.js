// Local URL: https://discord.com/api/oauth2/authorize?client_id=883125551139799070&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2F&response_type=code&scope=identify

const login = document.getElementById('login');
const logout = document.getElementById('logout');
const userData = document.getElementById('user-data');
const dashboard = document.getElementById('dashboard');

window.onload = async () => {
	const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	const data = await fetch('/api/session');
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
			const output = [];

			output.push(
				'<b>Bot status:</b> ' + (stats.isReady ? 'Online' : 'Offline')
			);
			output.push(
				'<b>Online since:</b> ' +
					relativeTime.format(stats.uptime / 1000 / 60 / 60, 'hour')
			);
			output.push('<b>Total guilds:</b> ' + stats.guildCount);

			output.push(`<table><tr><th></th><th>Name</td><th>Members</td><th>Guild</td><th>Owner</td><th>Age</td><th>Joined at</td></tr>
			${stats.guilds
				.sort((a, b) => b.memberCount - a.memberCount)
				.map((guild) => {
					return `<tr id="${guild.id}"><td><img src="${
						guild.icon
							? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
							: 'https://cdn.discordapp.com/embed/avatars/1.png'
					}" width="30px;"</td><td>${guild.name}</td><td>${
						guild.memberCount
					}</td><td><a href="https://discord.com/channels/${guild.id}">${
						guild.id
					}</a></td><td><a href="https://discord.com/users/${guild.owner}">${
						guild.owner
					}</a></td><td>${new Date(
						guild.createdAt
					).toLocaleDateString()}</td><td>${new Date(
						guild.joinedAt
					).toLocaleDateString()}</td></tr>`;
				})
				.join('')}
		  </table>`);

			const ownerData = [];

			stats.guilds.forEach((guild) => {
				const ownerIndex = ownerData.findIndex(
					(owner) => owner.id === guild.owner
				);
				if (ownerIndex === -1) {
					ownerData.push({
						id: guild.owner,
						guildCount: 1,
						guilds: [guild],
					});
				} else {
					ownerData[ownerIndex].guildCount++;
					ownerData[ownerIndex].guilds.push(guild);
				}
			});

			output.push(`<table><tr><th>Owner ID</td><th>Server count</td><th>Server names</td></tr>
			${ownerData
				.sort((a, b) => b.guildCount - a.guildCount)
				.filter((owner) => owner.guildCount > 1)
				.map(
					(owner) =>
						`<tr><td><a href="https://discord.com/users/${owner.id}">${
							owner.id
						}</a></td><td>${owner.guildCount}</td><td>${owner.guilds
							.map((guild) => `<a href="#${guild.id}">${guild.name}</a>`)
							.join(', ')}</td></tr>`
				)}
		  </table>`);
			dashboard.innerHTML = output.join('<br />');
		} else {
			dashboard.innerHTML = 'Dashboard (WIP)';
		}
	}
};
