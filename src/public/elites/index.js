String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const container = document.getElementById('container');

window.onload = async () => {
	const data = await fetch('/api/eliteTeams/');
	const res = await data.json();
	let teamBoxes = []

	for (team in res) {
		teamBoxes.push(`<div class="team-box ${team}">
			<div class="team-name">${team.replace('-',' ').capitalize()}</div>
	 		<div><b>Captain:</b> <a href="https://discord.com/users/${res[team][0].note}">${res[team][0].value}</a></div>
			<div class="team-vice"><b>Vice Captain:</b> <a href="https://discord.com/users/${res[team][1].note}">${res[team][1].value}</a></div>
			<div class="team-members">${res[team].slice(2).map(player=>`<div id="team-member"><a href="https://discord.com/users/${player.note}">${player.value}</a></div>`).join('')}</div></div>`)
	}
	container.innerHTML = teamBoxes.join('')
}