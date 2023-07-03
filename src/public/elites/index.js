const eliteTeams = {
	lime: 'Lemon Lime',
	'dark-green': 'The Darkness',
	red: 'Team Red',
	orange: 'Bloody Orange',
	purple: 'Casa Morada',
	'sky-blue': 'Smurfs',
};

const eliteDefuse = {
	teamOne: 'Black Sky',
	teamTwo: 'Bomb Squad',
	teamThree: 'Legends',
	teamFour: 'Team Indecisive',
	teamFive: 'Lollipopsicles',
	teamSix: 'Sin City',
	teamSeven: 'Red Allies',
	teamEight: 'eezy;Peezy'
};

const container = document.getElementById('container');

window.onload = async () => {
	const isDefuse = window.location.search.includes('defuse');
	const data = await fetch(`/api/${isDefuse ? 'eliteDefuse' : 'eliteTeams'}/`);
	const res = await data.json();
	const teamBoxes = [];

	for (const team in res) {
		teamBoxes.push(`<div class="team-box ${team}">
			<div class="team-name">${isDefuse ? eliteDefuse[team] : eliteTeams[team]}</div>
	 		<div><b>Captain:</b> <a href="https://discord.com/users/${
				res[team][0]?.note ?? ''
			}">${res[team][0]?.value ?? 'N/A'}</a></div>
			<div class="team-vice"><b>Vice Captain:</b> <a href="https://discord.com/users/${
				res[team][1]?.note ?? ''
			}">${res[team][1]?.value ?? 'N/A'}</a></div>
			<div class="team-members">${res[team]
				.slice(2)
				.map(
					(player) =>
						`<div id="team-member"><a href="https://discord.com/users/${player.note}">${player.value}</a></div>`
				)
				.join('')}</div></div>`);
	}
	container.innerHTML = teamBoxes.join('');
};
