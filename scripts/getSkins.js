import config from './src/config.js';
import fs from 'fs';

const skinData = JSON.parse(fs.readFileSync('./allskins.txt', 'utf8'));
function getSkin(skin) {
	if (skin === 80) return;
	let finalSkin = {};
	finalSkin.spec = skinData.specs[skin];
	finalSkin.images = {};
	if (skinData.specs[skin].base) {
		const imageName = skinData.specs[skin].base;
		finalSkin.images[imageName] = skinData.images[imageName];
	}
	const rotors = skinData.specs[skin].rotors.map((i) => i.img);
	rotors.forEach((rotor) => {
		finalSkin.images[rotor] = skinData.images[rotor];
	});
	fs.writeFileSync(`./src/skins/skin${skin}.txt`, JSON.stringify(finalSkin));
}
const originalSkins = {
	1: {
		base: 'player1',
		notint: 'player1-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 1,
	},
	2: {
		base: 'player2',
		notint: 'player2-notint',
		rotors: [
			{
				img: 'rotor2',
				x: -30.96 / 46.24,
				y: -30.96 / 46.24,
				speed: 8 * Math.PI,
				size: 19.593 / 65.333,
			},
			{
				img: 'rotor3',
				x: -30.96 / 46.24,
				y: 30.96 / 46.24,
				speed: 8 * Math.PI,
				size: 19.593 / 65.333,
			},
			{
				img: 'rotor3',
				x: 30.96 / 46.24,
				y: -30.96 / 46.24,
				speed: 8 * Math.PI,
				size: 19.593 / 65.333,
			},
			{
				img: 'rotor2',
				x: 30.96 / 46.24,
				y: 30.96 / 46.24,
				speed: 8 * Math.PI,
				size: 19.593 / 65.333,
			},
		],
		size: 65.333 / 102.769,
	},
	3: {
		base: 'player3',
		notint: 'player3-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 104.789 / 102.769,
	},
	4: {
		base: 'player4',
		notint: 'player4-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 102.621 / 102.769,
	},
	5: {
		base: 'player5',
		notint: 'player5-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 97.57 / 102.769,
	},
	6: {
		base: 'player6',
		notint: 'player6-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 102.621 / 102.769,
	},
	7: {
		base: 'player7',
		notint: 'player7-notint',
		rotors: [
			{
				img: 'rotor2',
				x: -21.97 / 38.3945,
				y: -21.72 / 38.3945,
				speed: 8 * Math.PI,
				size: 19.593 / 76.789,
			},
			{
				img: 'rotor3',
				x: -21.72 / 38.3945,
				y: 21.72 / 38.3945,
				speed: 8 * Math.PI,
				size: 19.593 / 76.789,
			},
			{
				img: 'rotor3',
				x: 21.97 / 38.3945,
				y: -21.72 / 38.3945,
				speed: 8 * Math.PI,
				size: 19.593 / 76.789,
			},
			{
				img: 'rotor2',
				x: 21.97 / 38.3945,
				y: 21.72 / 38.3945,
				speed: 8 * Math.PI,
				size: 19.593 / 76.789,
			},
		],
		size: 76.789 / 102.769,
	},
	8: {
		base: 'player8',
		notint: 'player8-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: (17.22 / 97.641) * 2,
				speed: 4 * Math.PI,
				size: 16.545 / 97.641,
			},
			{
				img: 'rotor1',
				x: 0,
				y: (-17.22 / 97.641) * 2,
				speed: 4 * Math.PI,
				size: 16.545 / 97.641,
			},
		],
		size: 97.641 / 102.769,
	},
	9: {
		base: 'player9',
		notint: 'player9-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 51.183 / 64.879,
			},
		],
		size: 64.879 / 102.769,
	},
	10: {
		base: 'player10',
		notint: 'player10-notint',
		rotors: [
			{
				img: 'rotor1',
				x: (-22.48 / 72.412) * 2,
				y: 0,
				speed: 4 * Math.PI,
				size: 33.953 / 72.412,
			},
			{
				img: 'rotor1',
				x: (22.48 / 72.412) * 2,
				y: 0,
				speed: 4 * Math.PI,
				size: 33.953 / 72.412,
			},
		],
		size: 72.412 / 102.769,
	},
	11: {
		base: 'player11',
		notint: 'player11-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 65.05 / 82.769,
			},
		],
		size: 82.769 / 102.769,
	},
	12: {
		base: 'player12',
		notint: 'player12-notint',
		rotors: [
			{
				img: 'rotor2',
				x: -15.95 / 39.848,
				y: -24.85 / 39.848,
				speed: 8 * Math.PI,
				size: 15.577 / 79.696,
			},
			{
				img: 'rotor3',
				x: -15.95 / 39.848,
				y: 24.85 / 39.848,
				speed: 8 * Math.PI,
				size: 15.577 / 79.696,
			},
			{
				img: 'rotor3',
				x: 15.95 / 39.848,
				y: -24.85 / 39.848,
				speed: 8 * Math.PI,
				size: 15.577 / 79.696,
			},
			{
				img: 'rotor2',
				x: 15.95 / 39.848,
				y: 24.85 / 39.848,
				speed: 8 * Math.PI,
				size: 15.577 / 79.696,
			},
		],
		size: 79.696 / 102.769,
	},
	13: {
		base: 'player13',
		notint: 'player13-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 65.05 / 88.841,
			},
		],
		size: 88.841 / 102.769,
	},
	14: {
		base: 'player14',
		notint: 'player14-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 34.038 / 88.841,
			},
		],
		size: 88.841 / 102.769,
	},
	15: {
		base: 'player15',
		notint: 'player15-notint',
		rotors: [
			{
				img: 'rotor4',
				x: 0,
				y: 0,
				speed: 2 * Math.PI,
				size: 44.206 / 59.912,
			},
		],
		size: 0.6412750926835914,
	},
	16: {
		base: 'player16',
		notint: 'player16-notint',
		rotors: [
			{
				img: 'rotor1',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 0.6329729782327356,
			},
		],
		size: 113.538 / 102.769,
	},
	17: {
		base: 'player17',
		notint: 'player17-notint',
		rotors: [
			{
				img: 'rotor3',
				x: 0,
				y: -22.05 / 37.365,
				speed: 4 * Math.PI,
				size: 19.289 / 74.73,
			},
			{
				img: 'rotor3',
				x: 0,
				y: 22.05 / 37.365,
				speed: 4 * Math.PI,
				size: 19.289 / 74.73,
			},
			{
				img: 'rotor3',
				x: 21.82 / 37.365,
				y: -22.83 / 37.365,
				speed: 4 * Math.PI,
				size: 19.289 / 74.73,
			},
			{
				img: 'rotor3',
				x: 21.82 / 37.365,
				y: 22.83 / 37.365,
				speed: 4 * Math.PI,
				size: 19.289 / 74.73,
			},
		],
		size: 74.73 / 102.769,
	},
	18: {
		base: 'player18',
		notint: 'player18-notint',
		rotors: [
			{
				img: 'rotor2',
				x: -25.63 / 38.7155,
				y: 0,
				speed: 4 * Math.PI,
				size: 16.111 / 96.214,
			},
			{
				img: 'rotor2',
				x: 11.5 / 38.7155,
				y: 22.28 / 38.7155,
				speed: 4 * Math.PI,
				size: 20.019 / 96.214,
			},
			{
				img: 'rotor2',
				x: 11.5 / 38.7155,
				y: -22.28 / 38.7155,
				speed: 4 * Math.PI,
				size: 20.019 / 96.214,
			},
		],
		size: 96.214 / 102.769,
	},
	19: {
		base: 'player19',
		notint: 'player19-notint',
		rotors: [
			{
				img: 'rotor1',
				x: -3.4 / 35.1875,
				y: 16.14 / 35.1875,
				speed: 4 * Math.PI,
				size: 9.354 / 70.375,
			},
			{
				img: 'rotor1',
				x: -3.4 / 35.1875,
				y: -16.14 / 35.1875,
				speed: 4 * Math.PI,
				size: 9.354 / 70.375,
			},
		],
		size: 79.214 / 102.769,
	},
	20: {
		base: 'player20',
		notint: 'player20-notint',
		rotors: [
			{
				img: 'rotor3',
				x: 0,
				y: 23.61 / 35.6755,
				speed: 8 * Math.PI,
				size: 42.767 / 71.351,
			},
			{
				img: 'rotor3',
				x: 0,
				y: -23.61 / 35.6755,
				speed: 8 * Math.PI,
				size: 42.767 / 71.351,
			},
		],
		size: 71.351 / 102.769,
	},
	21: {
		base: 'player21',
		notint: 'player21-notint',
		rotors: [
			{
				img: 'rotor5',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 68.192 / 100.233,
			},
		],
		size: 113.491 / 102.769,
	},
	22: {
		base: 'player22',
		notint: 'player22-notint',
		rotors: [
			{
				img: 'rotor6',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 1,
			},
		],
		size: 225 / 256,
	},
	23: {
		base: 'player23',
		notint: 'player23-notint',
		rotors: [
			{
				img: 'rotor6',
				x: 0,
				y: 0,
				speed: 4 * Math.PI,
				size: 1,
			},
		],
		size: 225 / 256,
	},
	24: {
		base: 'player24',
		notint: 'player24-notint',
		rotors: [
			{
				img: 'rotor7c',
				x: 0,
				y: 0,
				speed: 2 * Math.PI,
				size: 1,
				layer: 0,
			},
		],
		size: 0.6412750926835914,
	},
	25: {
		base: 'player25',
		notint: 'player25-notint',
		rotors: [
			{
				img: 'rotor8b',
				x: 0,
				y: 0,
				speed: 2 * Math.PI,
				size: 1,
				layer: 1,
			},
		],
		size: 0.6412750926835914,
	},
};
function getOGskin(skin) {
	const file = originalSkins[skin];
	let final = {
		spec: {
			base: '',
			notint: '',
			rotors: [],
			size: 1,
		},
		images: {},
	};
	final.spec.base = file.base;
	final.images[file.base] =
		'data:image/png;base64,' +
		fs.readFileSync(`./src/images/${file.base}.png`, 'base64');
	final.spec.notint = file.notint;
	final.images[file.notint] =
		'data:image/png;base64,' +
		fs.readFileSync(`./src/images/${file.notint}.png`, 'base64');
	file.rotors.forEach((i) => {
		final.images[i.img] =
			'data:image/png;base64,' +
			fs.readFileSync(`./src/images/${i.img}.png`, 'base64');
		final.spec.rotors.push({
			...i,
			visibility: '0',
			fixedRotation: false,
			noRotation: false,
			tinted: false,
			layer: 1,
		});
	});

	try {
		const base =
			fs.readFileSync(`./src/images/${file.base}.png`, 'base64url') ?? '';
		file.images[file.base] = base;
		final.images.base = file.base;
	} catch {}
	try {
		const notint =
			fs.readFileSync(`./src/images/${file.notint}.png`, 'base64url') ?? '';
		file.images[file.notint] = notint;
		final.images.notint = file.notint;
	} catch {}
	fs.writeFileSync(`./src/skins/skin${skin}.txt`, JSON.stringify(final));
}

Array.from({ length: config.MAX_SKINS }, (_, i) => i + 1).forEach((skin) => {
	if (skin <= 26) {
		getOGskin(skin);
	} else {
		getSkin(skin);
	}
});

console.log('Done!');
