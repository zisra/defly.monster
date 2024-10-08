import { google } from 'googleapis';

import config from '../config.js';

export async function eliteTeams() {
	return new Promise(function (resolve, reject) {
		const teamIDs = Object.keys(config.ELITE_TEAMS_MODE.TEAMS).reduce(
			(acc, key) => {
				acc[config.ELITE_TEAMS_MODE.TEAMS[key].spreadsheetId] = key;
				return acc;
			},
			{}
		);

		const sheets = google.sheets({
			version: 'v4',
			auth: config.SECRETS.GOOGLE_API_KEY,
		});

		sheets.spreadsheets.get(
			{
				spreadsheetId: config.ELITE_TEAMS_MODE.SPREADSHEET_ID,
				ranges: [config.ELITE_TEAMS_MODE.SPREADSHEET_RANGE],
				includeGridData: true,
			},
			(err, res) => {
				if (err) return reject(new Error(`The API returned an error: ${err}`));

				const { data } = res;
				const sheetData = data.sheets[0].data[0].rowData.map((row) => {
					return row.values.map((cell) => {
						let note;
						if (cell.note) note = cell.note.match(/\d+/)?.[0] || '';

						return {
							value: cell.formattedValue,
							note,
						};
					});
				});

				const output = Object.keys(config.ELITE_TEAMS_MODE.TEAMS).reduce(
					(acc, key) => {
						acc[key] = [];
						return acc;
					},
					{}
				);

				sheetData.forEach((row) => {
					for (const cell in row) {
						if (teamIDs[cell]) {
							output[teamIDs[cell]].push(row[cell]);
						}
					}
				});

				for (const team in output) {
					output[team] = output[team].filter((cell) => {
						return cell.value !== undefined;
					});
				}

				resolve(output);
			}
		);
	});
}
