import axios from 'axios';
import fs from 'fs';
import sharp from 'sharp';

function getAllSkins() {
	axios
		.get('https://defly.io/img/add-skins.js', {
			responseType: 'stream',
		})
		.then((response) => {
			response.data.pipe(fs.createWriteStream('allskins.txt'));
		});
}

function getOGskins() {
	const baseURL = 'https://defly.io/img/';

	const files = [
		'spritesheet.png',
		'spritesheet.json',
		'spritesheet9.png',
		'spritesheet9.json',
		'spritesheet92.png',
		'spritesheet92.json',
	];

	const requests = files.map((file) => {
		const fileExtension = file.split('.')[1];
		return axios.get(file, {
			responseType: fileExtension === 'png' ? 'arraybuffer' : 'json',
			baseURL,
		});
	});

	const createImage = (image, JSON) => {
		Object.keys(JSON.data.frames).forEach((i, index) => {
			i = JSON.data.frames[i];
			sharp(image.data)
				.extract({
					width: i.frame.w,
					height: i.frame.w,
					left: i.frame.x,
					top: i.frame.y,
				})
				.toBuffer({ resolveWithObject: true })
				.then(({ data }) => {
					fs.writeFileSync(
						`./src/images/${Object.keys(JSON.data.frames)[index]}.png`,
						data
					);
				})
				.catch((err) => {
					console.error(err);
				});
		});
	};

	console.log('Making requests...');

	Promise.all(requests).then((results) => {
		const [image0, JSON0, image9, JSON9, image92, JSON92] = results;
		createImage(image0, JSON0);
		createImage(image9, JSON9);
		createImage(image92, JSON92);
	});
}
getOGskins();
getAllSkins();

console.log('Done!');
