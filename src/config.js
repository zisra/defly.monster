import fs from 'node:fs';

const PREFIX = 'd?';
const UPGRADES = {
	ON: '<:upg_on:948707185716772874>',
	OFF: '<:upg_off:948707185771294771>',
};
const EXCUSES = [
	'I swear it was lag!',
	'Dang, why is my ping so high?',
	'Why do people have to kill me when I get a disconnect?',
	'Dang, that was an invisible bullet.',
	'My cat just walked on my keyboard :(',
	'I was AFK! Darn it!',
	'Why did I just die? My key was jammed.',
	'Oh no! My keyboard dropped and it made me die. How unfortunate :(',
	'My computer is so laggy today',
	'A lightning stroke my house and I lost signal, Thor hates me.',
	"I don't use this skin usually, it makes me lag a lot.",
	'I was checking Discord! Why did you kill me?',
	'Why are there so many hackers in this game? Get reported!',
	"My battery died, the charger didn't plug correctly.",
	'Is this a new update? I see bullets go faster than usual.',
	'I swear someone changed the hitbox size!',
	'Get reported, hackers!',
	"I'm using a different browser. Curse you internet explorer!",
	'I had a phone to pick! How rude >:(',
	"Okay I'm back- Wait, when did I get killed?",
	'Weird how I died, there must be a bug in the game',
	"Not to make any excuses, but I'm pretty sure I got killed by a hacker.",
	'Oof, that was my clone.',
];
const MAX_SKINS = 137;
const MAX_BADGES = 47;
const REGION_LIST = [
	{ region: 'USE1', ws: 'use4', alias: 'use', name: 'US East' },
	{ region: 'USW1', ws: 'usw4', alias: 'usw', name: 'US West' },
	{ region: 'EU1', ws: 'eu1-1', alias: 'eu', name: 'Europe' },
	// { region: 'TOK1', ws: 'tok2', alias: 'asia', name: 'Asia East' },
	{
		region: 'AU',
		ws: 'au2',
		alias: 'au',
		name: 'Australia',
	},
	{ region: 'TR', ws: 'use5', alias: 'tr', name: 'Tournament' },
];
const PORT_LIST = [
	{ port: 3005, mode: 'Teams' },
	{ port: 3015, mode: 'Teams' },
	{ port: 3025, mode: 'Teams' },
	{ port: 3035, mode: 'Teams' },
	{ port: 3045, mode: 'Teams' },
	{ port: 3002, mode: 'Defuse' },
	{ port: 3012, mode: 'Defuse' },
	{ port: 3022, mode: 'Defuse' },
	{ port: 3032, mode: 'Defuse' },
	{ port: 3042, mode: 'Defuse' },
	{ port: 3009, mode: 'Tournament' },
];
const TEAM_COLORS = {
	2: { color: 'Blue', hex: '3d5dff' },
	3: { color: 'Red', hex: 'fd3535' },
	4: { color: 'Dark Green', hex: '008037' },
	5: { color: 'Orange', hex: 'ff8a2' },
	6: { color: 'Purple', hex: '924bff' },
	7: { color: 'Sky Blue', hex: '55d5ff' },
	8: { color: 'Green', hex: '18e21f' },
	9: { color: 'Pink', hex: 'f659ff' },
};
const SUPPORT_GUILD = 'AMyahUvd4Q';
const EMBED = {
	SUCCESS: '3fa577',
	WARNING: 'fbab18',
	ERROR: 'f04747',
	MAIN: 'f659ff',
};
const TIME_FORMATS = ['t', 'T', 'd', 'D', 'f', 'F', 'R'];
const ELITE_TEAMS_MODE = {
	SPREADSHEET_RANGE: 'Season 08!A5:N20',
	SPREADSHEET_ID: '1b2z_lTIPEVhabnP73Mir3ttOZlqgEoLV9mLE1T-m1Y4',
	TEAMS: {
		lime: {
			spreadsheetId: 1,
			color: '93fe00',
			name: 'Viridescent',
		},
		'dark-green': {
			spreadsheetId: 3,
			color: '008037',
			name: 'The Darkness',
		},
		red: {
			spreadsheetId: 5,
			color: 'fd3535',
			name: 'Team Red',
		},
		orange: {
			spreadsheetId: 7,
			color: 'ff8a2a',
			name: 'Bloody Orange',
		},
		purple: {
			spreadsheetId: 9,
			color: '924bff',
			name: 'Casa Morada',
		},
		'sky-blue': {
			spreadsheetId: 11,
			color: '55d5ff',
			name: 'Smurfs',
		},
	},
};
const ELITE_DEFUSE_MODE = {
	SPREADSHEET_RANGE: 'Season02!A4:T17',
	SPREADSHEET_ID: '1Hk59f4nKzRZ8tkben35mUOj_ltLgLj_lZxcjQPry5Tk',
	TEAMS: {
		teamOne: {
			spreadsheetId: 1,
			color: '19e691',
			name: 'Black Sky',
		},
		teamTwo: {
			spreadsheetId: 3,
			color: '19e6d5',
			name: 'The Bomb Squad',
		},
		teamThree: {
			spreadsheetId: 5,
			color: 'd419e6',
			name: 'Da Bois',
		},
		teamFour: {
			spreadsheetId: 7,
			color: '19d5e6',
			name: 'Team Indecisive',
		},
		teamFive: {
			spreadsheetId: 9,
			color: 'e619d5',
			name: 'Lollipopsicles',
		},
		teamSix: {
			spreadsheetId: 11,
			color: '2a19e6',
			name: 'The Slayers',
		},
		teamSeven: {
			spreadsheetId: 13,
			color: 'e61919',
			name: 'Fruitism'
		},
		teamEight: {
			spreadsheetId: 15,
			color: 'f7ff2a',
			name: 'eezy;Peezy',
		},
		teamNine: {
			spreadsheetId: 17,
			color: 'f4bac5',
			name: 'Maid Cafe',
		},
		teamTen: {
			spreadsheetId: 19,
			color: '999999',
			name: 'Withering Touch',
		}
	},
};
const INVITE_URL =
	'https://discord.com/api/oauth2/authorize?client_id=883125551139799070&permissions=8858758209&scope=bot%20applications.commands';
const ELITE_CHANGES_CHANNEL = '1055715651311915008';
const CLOUDFLARE_WORKER_URL = 'https://defly-websocket.isra.workers.dev/';
const ERROR_EMOJI = '\u274C';
const ACTIVITY = 'defly.io';
const HELP_COMMAND_ID = '1053166812231123051';

let SECRETS;

if (fs.existsSync('.env')) {
	const envFile = fs.readFileSync('.env', 'utf8');
	const envVars = envFile.split('\n').reduce((acc, line) => {
		if (line.trim() !== '' && line.trim()[0] !== '#') {
			const [key, value] = line.split('=');
			acc[key.trim()] = value.trim();
		}
		return acc;
	}, {});
	SECRETS = envVars;
} else {
	SECRETS = process.env;
}

export default {
	PREFIX,
	UPGRADES,
	EXCUSES,
	MAX_SKINS,
	MAX_BADGES,
	REGION_LIST,
	PORT_LIST,
	TEAM_COLORS,
	SUPPORT_GUILD,
	EMBED,
	TIME_FORMATS,
	ELITE_DEFUSE_MODE,
	ELITE_TEAMS_MODE,
	INVITE_URL,
	ELITE_CHANGES_CHANNEL,
	CLOUDFLARE_WORKER_URL,
	SECRETS,
	ERROR_EMOJI,
	ACTIVITY,
	HELP_COMMAND_ID,
};
