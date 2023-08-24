import fs from 'node:fs';

import config from '../src/config.js';

const originalSkins = JSON.parse(
	fs.readFileSync('./scripts/originalSkins.json', 'utf8')
);

const skinData = JSON.parse(fs.readFileSync('./scripts/allSkins.txt', 'utf8'));
function getSkin(skin) {
	if (skin === 80) return;
	const finalSkin = {};
	finalSkin.spec = skinData.specs[skin];
	finalSkin.images = {};
	if (skinData.specs[skin].base) {
		const imageName = skinData.specs[skin].base;
		finalSkin.images[imageName] = skinData.images[imageName];
	}
	if (skinData.specs[skin].notint) {
		const imageName = skinData.specs[skin].notint;
		finalSkin.images[imageName] = skinData.images[imageName];
	}
	const rotors = skinData.specs[skin].rotors.map((i) => i.img);
	rotors.forEach((rotor) => {
		finalSkin.images[rotor] = skinData.images[rotor];
	});
	fs.writeFileSync(`./src/skins/skin${skin}.txt`, JSON.stringify(finalSkin));
}

function getOGskin(skin) {
	const file = originalSkins[skin];
	const final = {
		spec: {
			base: '',
			notint: '',
			rotors: [],
			size: 1,
		},
		images: {},
	};
	console.log(file.base);
	final.spec.base = file.base;
	final.images[file.base] =
		'data:image/png;base64,' +
		fs.readFileSync(`./src/images/${file.base}.png`, 'base64');
	final.spec.notint = file.notint;
	final.images[file.notint] =
		'data:image/png;=base64,' +
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

	if (file.base) {
		const base =
			fs.readFileSync(`./src/images/${file.base}.png`, 'base64url') ?? '';
		file.images[file.base] = base;
		final.images.base = file.base;
	}
	if (file.notint) {
		const notint =
			fs.readFileSync(`./src/images/${file.notint}.png`, 'base64url') ?? '';
		file.images[file.notint] = notint;
		final.images.notint = file.notint;
	}
	fs.writeFileSync(`./src/skins/skin${skin}.txt`, JSON.stringify(final));
}

Array.from({ length: config.MAX_SKINS }, (_, i) => i + 1).forEach((skin) => {
	if (skin <= 25) {
		// getOGskin(skin);
	} else {
		getSkin(skin);
	}
});

console.log('Done!');
