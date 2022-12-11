const { google } = require('googleapis');
const config = require('../config.js');

async function eliteTeams() {
	return new Promise(function (resolve, reject) {

		const sheets = google.sheets({
			version: 'v4',
			auth: process.env.GOOGLE_API_KEY,
		});

		sheets.spreadsheets.get(
			{
				spreadsheetId: config.SPREADSHEET_ID,
				ranges: [config.SPREADSHEET_RANGE],
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
						if (config.SPREADSHEET_TEAMS[cell]) {
							output[config.SPREADSHEET_TEAMS[cell]].push(row[cell]);
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
