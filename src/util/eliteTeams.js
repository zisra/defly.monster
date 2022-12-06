const axios = require('axios');
const Papa = require('papaparse');

const config = require('../config.js');

async function eliteTeams(mode) {
	let teams = {
		blue: 1,
		'dark-green': 3,
		orange: 7,
		green: 9,
		red: 5,
		'sky-blue': 11,
	};
	let res = await axios.get(
		`https://docs.google.com/spreadsheets/d/${config.SPREADSHEET_ID}/export?format=csv`);

	const sheet = Papa.parse(res.data);
	let out = teams;

	sheet.data.splice(0, 4);
	for (const team in teams) {
		out[team] = sheet.data
			.map((i) => {
				return i[teams[team]];
			})
			.splice(0, 20)
			.filter((i) => i !== '');
	}
	return out;
}
exports.eliteTeams = eliteTeams;
