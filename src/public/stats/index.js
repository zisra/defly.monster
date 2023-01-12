const fileInput = document.querySelector('#file-input');
const fileName = document.querySelector('#file-name');
const statsChart = document.querySelector('#stats-chart');
const fileBlock = document.querySelector('#file-block');
const searchField = document.querySelector('#search-field');
const filterField = document.getElementById('filter-field');
const searchContainer = document.querySelector('#search-container');
const notifications = document.querySelector('#notifications');

const replaceCharacters = {
	'&': '&amp;',
	'>': '&gt;',
	'<': '&lt;',
	'"': '&quot;',
	"'": '&#39;',
	'`': '&#96;',
};

let fileData;
let submittedFileName;

function search(e) {
	e.preventDefault();
	let stats = parseCSV(fileData);
	const filterCount = filterField.value;
	const searchData = searchField.value;
	statsChart.innerHTML = generateTable(
		stats
			.filter((i) => {
				return i[0].toLowerCase().includes(searchData.toLowerCase());
			})
			.slice(0, filterCount || 1e6)
	);
	sorttable.makeSortable(document.getElementById('table'));
}

function showAlert(message) {
	notifications.innerHTML = `
  <div class="notification is-danger is-light">
    <button class="delete" id="delete"></button>
      ${message} 
  </div>
  `;
	const deleteButton = document.getElementById('delete');
	deleteButton.addEventListener('click', () => {
		notifications.removeChild(deleteButton.parentNode);
	});
}

function downloadURI(uri, name) {
	let link = document.createElement('a');
	link.download = name;
	link.href = uri;
	link.rel = 'noopener';
	link.click();
	delete link;
}

function saveFile() {
	html2canvas(document.getElementById('table')).then((canvas) => {
		const dataUrl = canvas.toDataURL('png');
		const win = window.open(dataUrl);
		downloadURI(dataUrl, `${submittedFileName.replace('.csv', '.png')}`);
	});
}

function sanitize(string) {
	const regex = new RegExp(Object.keys(replaceCharacters).join('|'), 'g');
	return String(string).replace(regex, (match) => replaceCharacters[match]);
}

function generateTable(stats) {
	return `<table class="table sortable" id="table"><thead><tr><th>Nickname</th><th>Dots destroyed</th><th>Kills</th><th>Max level</th><th>Plays</th><th>Highest area</th><th>Highest score</th><th>Playtime</th><th>Kills/plays</th><th>Kills-plays</th><tbody>
              ${stats
								.map((row) => {
									const nickname = row[0];
									row.shift();
									return `<tr tabindex="0"><th>${nickname}</th>${row
										.map((cell) => {
											cell = cell.includes(':') ? cell : parseFloat(cell);
											return `<td>${cell}</td>`;
										})
										.join('')}</tr>`;
								})
								.join('')}</tbody></tr></thead></table>`;
}

function parseCSV(fileData) {
	let stats = fileData.split('\n').map((line) => {
		if (line.length) {
			return line
				.replace('\r', '')
				.match(/"[^"]*"|[^,]+/gm)
				.map((i) => i.replaceAll(`"`, ''));
		} else {
			return null;
		}
	});
	stats.shift();
	stats.pop();
	return stats;
}

function parseFile(fileData) {
	let stats = parseCSV(fileData);
	statsChart.innerHTML = generateTable(stats);
	sorttable.makeSortable(document.getElementById('table'));
	searchContainer.classList.remove('is-hidden');
	searchField.focus();
}

function parseInput(input) {
	if (input.files.length > 0) {
		fileName.textContent = input.files[0].name;
		submittedFileName = input.files[0].name;
		const reader = new FileReader();
		reader.onload = (e) => {
			fileData = e.target.result;
			parseFile(fileData);
		};
		reader.readAsText(input.files[0]);
	}
}

fileInput.onchange = () => {
	parseInput(fileInput);
};

fileBlock.ondrop = (e) => {
	e.preventDefault();
	fileBlock.classList.remove('is-link');
	const file = e.dataTransfer.items[0].getAsFile();
	if (file.type !== 'text/csv') {
		return showAlert('The uploaded file must be a CSV');
	}
	notifications.innerHTML = '';
	const reader = new FileReader();
	reader.onload = (e) => {
		fileData = e.target.result;
		parseFile(fileData);
	};
	reader.readAsText(file);
};

fileBlock.ondragenter = (e) => {
	e.preventDefault();
	fileBlock.classList.add('is-link');
};

fileBlock.ondragleave = (e) => {
	e.preventDefault();
	fileBlock.classList.remove('is-link');
};

fileBlock.ondragover = (e) => {
	e.preventDefault();
	fileBlock.classList.add('is-link');
};

window.onkeydown = (e) => {
	if (e.keyCode == 70 && (e.ctrlKey || e.metaKey)) {
		e.preventDefault();
		searchField.focus();
	}
};
