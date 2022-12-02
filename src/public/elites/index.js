String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const container = document.getElementById('container');

window.onload = async () => {
	const data = await fetch('/api/eliteTeams');
	const res = await data.json();
	let teamBoxes = []

	for (team in res) {
		teamBoxes.push(`<div class="team-box ${team}">
			<div class="team-name">${team.replace('-',' ').capitalize()}</div>
	 		<div><b>Captain:</b> ${res[team][0]}</div>
			<div class="team-vice"><b>Vice Captain:</b> ${res[team][1]}</div>
			<div class="team-members">${res[team].slice(2).map(player=>`<div id="team-member">${player}</div>`).join('')}</div></div>`)
	}
	container.innerHTML = teamBoxes.join('')
}