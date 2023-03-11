import { google } from 'googleapis';
import config from '../config.js';

export async function eliteTeams() {
	return new Promise(function (resolve, reject) {
		const sheets = google.sheets({
			version: 'v4',
			auth: config.SECRETS.GOOGLE_API_KEY,
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

				let output = Object.keys(config.ELITE_TEAMS).reduce((acc, key) => {
					acc[key] = [];
					return acc;
				}, {});

				sheetData.forEach((row) => {
					for (let cell in row) {
						if (config.ELITE_TEAM_IDS[cell]) {
							output[config.ELITE_TEAM_IDS[cell]].push(row[cell]);
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
