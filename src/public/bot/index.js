const commands = document.getElementById('commands');

window.onload = async () => {
	const data = await fetch('/api/commands');
	const res = await data.json();

	commands.innerHTML =
		'<ul id="commands-list">' +
		res
			.map(
				(command) =>
					`<li class="command"><div class="command-title">/${command.name}</div><div id="">${command.description}</div></li>`
			)
			.join('') +
		'</ul>';
};
