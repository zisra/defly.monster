const { google } = require('googleapis');

const spreadsheetId = '1b2z_lTIPEVhabnP73Mir3ttOZlqgEoLV9mLE1T-m1Y4';
const sheets = google.sheets({
	version: 'v4',
	auth: 'AIzaSyD7AYBC7iKFp8pDknLFky0Ytrl5ZTwgixU',
});
const range = 'Season 07!A5:L24';
const teams = {
	1: 'blue',
	3: 'dark-green',
	7: 'orange',
	9: 'green',
	5: 'red',
	11: 'sky-blue',
};

async function eliteTeams() {
	return new Promise(function (resolve, reject) {
		sheets.spreadsheets.get(
			{
				spreadsheetId,
				ranges: [range],
				includeGridData: true,
			},
			(err, res) => {
				if (err) return reject(`The API returned an error: ${err}`);

				const { data } = res;
				const sheetData = data.sheets[0].data[0].rowData.map((row) => {
					return row.values.map((cell) => {
						let note = undefined;
						if (cell.note) note = cell.note.replace(' ', '').split('\n')[0];

						return {
							value: cell.formattedValue,
							note: note,
						};
					});
				});

				let output = {
					blue: [],
					'dark-green': [],
					orange: [],
					green: [],
					red: [],
					'sky-blue': [],
				};

				sheetData.forEach((row) => {
					for (cell in row) {
						if (teams[cell]) {
							output[teams[cell]].push(row[cell]);
						}
					}
				});

				for (let team in output) {
					output[team] = output[team].filter((cell) => {
						return cell.value !== undefined;
					});
				}

				resolve(output);
			}
		);
	});
}

exports.eliteTeams = eliteTeams;
