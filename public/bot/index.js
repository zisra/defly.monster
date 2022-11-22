const commands = document.getElementById('commands');

window.onload = async () => {
	const data = await fetch('/api/commands');
	const res = await data.json();
	
	commands.innerHTML = '<ul id="commands-list">' + res.map(i => `<li class="command"><div class="command-title">${i.name} ${i.arguments == false ? '' : i.arguments.map(i => `&lt;${i}&gt;`).join(' ')}</div><div id="">${i.description}</div></li>`).join('') + '</ul>';
}