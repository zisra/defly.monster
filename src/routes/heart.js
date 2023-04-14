import { Resvg } from '@resvg/resvg-js';

import Response from '../util/apiResponse.js';

function makeSVG(hex) {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="${hex}" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"/></svg>`;
}

export default (req, res) => {
	if (!req.query.color) {
		return Response(res, {
			type: 'missingParameter',
			data: 'Missing color query parameter',
		});
	}
	const svg = makeSVG(req.query.color);

	if (req.query.format === 'png') {
		res.setHeader('Content-Type', 'image/png');
		let png = new Resvg(svg, {
			fitTo: {
				mode: 'height',
				value: 256,
			},
		});
		png = png.render();
		png = png.asPng();
		res.end(png);
		return;
	} else {
		res.setHeader('Content-Type', 'image/svg+xml');
		res.end(svg);
	}
};
