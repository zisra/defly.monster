import { Resvg } from '@resvg/resvg-js';

export function generateUpgrades(upgrades, format, height) {
	return new Promise((resolve) => {
		const SVG = [];

		upgrades = upgrades.split('');

		if (upgrades.length !== 7) {
			throw new Error('Build must be 7 characters');
		}

		if (upgrades.reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32) {
			throw new Error('Build must add up to 32');
		}

		if (
			upgrades.find(
				(upgrade) =>
					parseInt(upgrade) > 8 ||
					parseInt(upgrade) < 0 ||
					isNaN(parseInt(upgrade))
			)
		) {
			throw new Error('Each upgrade must be a number between 0 and 8');
		}

		const upgradeStats = [];

		upgrades.forEach((line) => {
			const upgradeLine = [
				'808080',
				'808080',
				'808080',
				'808080',
				'808080',
				'808080',
				'808080',
				'808080',
			];
			upgradeLine.fill('FF8C26', 0, line);
			upgradeStats.push(upgradeLine);
		});

		upgradeStats.reverse();

		SVG.push(
			'<svg width="228" height="180" viewBox="0 0 228 180" fill="none" xmlns="http://www.w3.org/2000/svg">'
		);

		SVG.push(
			'<path d="M0 164C0 159.582 3.58172 156 8 156H220C224.418 156 228 159.582 228 164V172C228 176.418 224.418 180 220 180H8C3.58172 180 0 176.418 0 172V164Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 138C0 133.582 3.58172 130 8 130H220C224.418 130 228 133.582 228 138V146C228 150.418 224.418 154 220 154H8C3.58172 154 0 150.418 0 146V138Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 112C0 107.582 3.58172 104 8 104H220C224.418 104 228 107.582 228 112V120C228 124.418 224.418 128 220 128H8C3.58172 128 0 124.418 0 120V112Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 86C0 81.5817 3.58172 78 8 78H220C224.418 78 228 81.5817 228 86V94C228 98.4183 224.418 102 220 102H8C3.58172 102 0 98.4183 0 94V86Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 60C0 55.5817 3.58172 52 8 52H220C224.418 52 228 55.5817 228 60V68C228 72.4183 224.418 76 220 76H8C3.58172 76 0 72.4183 0 68V60Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 34C0 29.5817 3.58172 26 8 26H220C224.418 26 228 29.5817 228 34V42C228 46.4183 224.418 50 220 50H8C3.58172 50 0 46.4183 0 42V34Z" fill="#4c4c4c"/>'
		);
		SVG.push(
			'<path d="M0 8C0 3.58172 3.58172 0 8 0H220C224.418 0 228 3.58172 228 8V16C228 20.4183 224.418 24 220 24H8C3.58172 24 0 20.4183 0 16V8Z" fill="#4c4c4c"/>'
		);

		SVG.push(
			`<path d="M4 164C4 161.791 5.79086 160 8 160H24C26.2091 160 28 161.791 28 164V172C28 174.209 26.2091 176 24 176H8C5.79086 176 4 174.209 4 172V164Z" fill="#${upgradeStats[0][0]}"/><path d="M32 164C32 161.791 33.7909 160 36 160H52C54.2091 160 56 161.791 56 164V172C56 174.209 54.2091 176 52 176H36C33.7909 176 32 174.209 32 172V164Z" fill="#${upgradeStats[0][1]}"/><path d="M60 164C60 161.791 61.7909 160 64 160H80C82.2091 160 84 161.791 84 164V172C84 174.209 82.2091 176 80 176H64C61.7909 176 60 174.209 60 172V164Z" fill="#${upgradeStats[0][2]}"/><path d="M88 164C88 161.791 89.7909 160 92 160H108C110.209 160 112 161.791 112 164V172C112 174.209 110.209 176 108 176H92C89.7909 176 88 174.209 88 172V164Z" fill="#${upgradeStats[0][3]}"/><path d="M116 164C116 161.791 117.791 160 120 160H136C138.209 160 140 161.791 140 164V172C140 174.209 138.209 176 136 176H120C117.791 176 116 174.209 116 172V164Z" fill="#${upgradeStats[0][4]}"/><path d="M144 164C144 161.791 145.791 160 148 160H164C166.209 160 168 161.791 168 164V172C168 174.209 166.209 176 164 176H148C145.791 176 144 174.209 144 172V164Z" fill="#${upgradeStats[0][5]}"/><path d="M172 164C172 161.791 173.791 160 176 160H192C194.209 160 196 161.791 196 164V172C196 174.209 194.209 176 192 176H176C173.791 176 172 174.209 172 172V164Z" fill="#${upgradeStats[0][6]}"/><path d="M200 164C200 161.791 201.791 160 204 160H220C222.209 160 224 161.791 224 164V172C224 174.209 222.209 176 220 176H204C201.791 176 200 174.209 200 172V164Z" fill="#${upgradeStats[0][7]}"/>`
		);

		SVG.push(
			`<path d="M4 138C4 135.791 5.79086 134 8 134H24C26.2091 134 28 135.791 28 138V146C28 148.209 26.2091 150 24 150H8C5.79086 150 4 148.209 4 146V138Z" fill="#${upgradeStats[1][0]}"/><path d="M32 138C32 135.791 33.7909 134 36 134H52C54.2091 134 56 135.791 56 138V146C56 148.209 54.2091 150 52 150H36C33.7909 150 32 148.209 32 146V138Z" fill="#${upgradeStats[1][1]}"/><path d="M60 138C60 135.791 61.7909 134 64 134H80C82.2091 134 84 135.791 84 138V146C84 148.209 82.2091 150 80 150H64C61.7909 150 60 148.209 60 146V138Z" fill="#${upgradeStats[1][2]}"/><path d="M88 138C88 135.791 89.7909 134 92 134H108C110.209 134 112 135.791 112 138V146C112 148.209 110.209 150 108 150H92C89.7909 150 88 148.209 88 146V138Z" fill="#${upgradeStats[1][3]}"/><path d="M116 138C116 135.791 117.791 134 120 134H136C138.209 134 140 135.791 140 138V146C140 148.209 138.209 150 136 150H120C117.791 150 116 148.209 116 146V138Z" fill="#${upgradeStats[1][4]}"/><path d="M144 138C144 135.791 145.791 134 148 134H164C166.209 134 168 135.791 168 138V146C168 148.209 166.209 150 164 150H148C145.791 150 144 148.209 144 146V138Z" fill="#${upgradeStats[1][5]}"/><path d="M172 138C172 135.791 173.791 134 176 134H192C194.209 134 196 135.791 196 138V146C196 148.209 194.209 150 192 150H176C173.791 150 172 148.209 172 146V138Z" fill="#${upgradeStats[1][6]}"/><path d="M200 138C200 135.791 201.791 134 204 134H220C222.209 134 224 135.791 224 138V146C224 148.209 222.209 150 220 150H204C201.791 150 200 148.209 200 146V138Z" fill="#${upgradeStats[1][7]}"/>`
		);

		SVG.push(
			`<path d="M4 112C4 109.791 5.79086 108 8 108H24C26.2091 108 28 109.791 28 112V120C28 122.209 26.2091 124 24 124H8C5.79086 124 4 122.209 4 120V112Z" fill="#${upgradeStats[2][0]}"/><path d="M32 112C32 109.791 33.7909 108 36 108H52C54.2091 108 56 109.791 56 112V120C56 122.209 54.2091 124 52 124H36C33.7909 124 32 122.209 32 120V112Z" fill="#${upgradeStats[2][1]}"/><path d="M60 112C60 109.791 61.7909 108 64 108H80C82.2091 108 84 109.791 84 112V120C84 122.209 82.2091 124 80 124H64C61.7909 124 60 122.209 60 120V112Z" fill="#${upgradeStats[2][2]}"/><path d="M88 112C88 109.791 89.7909 108 92 108H108C110.209 108 112 109.791 112 112V120C112 122.209 110.209 124 108 124H92C89.7909 124 88 122.209 88 120V112Z" fill="#${upgradeStats[2][3]}"/><path d="M116 112C116 109.791 117.791 108 120 108H136C138.209 108 140 109.791 140 112V120C140 122.209 138.209 124 136 124H120C117.791 124 116 122.209 116 120V112Z" fill="#${upgradeStats[2][4]}"/><path d="M144 112C144 109.791 145.791 108 148 108H164C166.209 108 168 109.791 168 112V120C168 122.209 166.209 124 164 124H148C145.791 124 144 122.209 144 120V112Z" fill="#${upgradeStats[2][5]}"/><path d="M172 112C172 109.791 173.791 108 176 108H192C194.209 108 196 109.791 196 112V120C196 122.209 194.209 124 192 124H176C173.791 124 172 122.209 172 120V112Z" fill="#${upgradeStats[2][6]}"/><path d="M200 112C200 109.791 201.791 108 204 108H220C222.209 108 224 109.791 224 112V120C224 122.209 222.209 124 220 124H204C201.791 124 200 122.209 200 120V112Z" fill="#${upgradeStats[2][7]}"/>`
		);

		SVG.push(
			`<path d="M4 86C4 83.7909 5.79086 82 8 82H24C26.2091 82 28 83.7909 28 86V94C28 96.2091 26.2091 98 24 98H8C5.79086 98 4 96.2091 4 94V86Z" fill="#${upgradeStats[3][0]}"/><path d="M32 86C32 83.7909 33.7909 82 36 82H52C54.2091 82 56 83.7909 56 86V94C56 96.2091 54.2091 98 52 98H36C33.7909 98 32 96.2091 32 94V86Z" fill="#${upgradeStats[3][1]}"/><path d="M60 86C60 83.7909 61.7909 82 64 82H80C82.2091 82 84 83.7909 84 86V94C84 96.2091 82.2091 98 80 98H64C61.7909 98 60 96.2091 60 94V86Z" fill="#${upgradeStats[3][2]}"/><path d="M88 86C88 83.7909 89.7909 82 92 82H108C110.209 82 112 83.7909 112 86V94C112 96.2091 110.209 98 108 98H92C89.7909 98 88 96.2091 88 94V86Z" fill="#${upgradeStats[3][0]}"/><path d="M116 86C116 83.7909 117.791 82 120 82H136C138.209 82 140 83.7909 140 86V94C140 96.2091 138.209 98 136 98H120C117.791 98 116 96.2091 116 94V86Z" fill="#${upgradeStats[3][4]}"/><path d="M144 86C144 83.7909 145.791 82 148 82H164C166.209 82 168 83.7909 168 86V94C168 96.2091 166.209 98 164 98H148C145.791 98 144 96.2091 144 94V86Z" fill="#${upgradeStats[3][5]}"/><path d="M172 86C172 83.7909 173.791 82 176 82H192C194.209 82 196 83.7909 196 86V94C196 96.2091 194.209 98 192 98H176C173.791 98 172 96.2091 172 94V86Z" fill="#${upgradeStats[3][6]}"/><path d="M200 86C200 83.7909 201.791 82 204 82H220C222.209 82 224 83.7909 224 86V94C224 96.2091 222.209 98 220 98H204C201.791 98 200 96.2091 200 94V86Z" fill="#${upgradeStats[3][7]}"/>`
		);

		SVG.push(
			`<path d="M4 60C4 57.7909 5.79086 56 8 56H24C26.2091 56 28 57.7909 28 60V68C28 70.2091 26.2091 72 24 72H8C5.79086 72 4 70.2091 4 68V60Z" fill="#${upgradeStats[4][0]}"/><path d="M32 60C32 57.7909 33.7909 56 36 56H52C54.2091 56 56 57.7909 56 60V68C56 70.2091 54.2091 72 52 72H36C33.7909 72 32 70.2091 32 68V60Z" fill="#${upgradeStats[4][1]}"/><path d="M60 60C60 57.7909 61.7909 56 64 56H80C82.2091 56 84 57.7909 84 60V68C84 70.2091 82.2091 72 80 72H64C61.7909 72 60 70.2091 60 68V60Z" fill="#${upgradeStats[4][2]}"/><path d="M88 60C88 57.7909 89.7909 56 92 56H108C110.209 56 112 57.7909 112 60V68C112 70.2091 110.209 72 108 72H92C89.7909 72 88 70.2091 88 68V60Z" fill="#${upgradeStats[4][3]}"/><path d="M116 60C116 57.7909 117.791 56 120 56H136C138.209 56 140 57.7909 140 60V68C140 70.2091 138.209 72 136 72H120C117.791 72 116 70.2091 116 68V60Z" fill="#${upgradeStats[4][4]}"/><path d="M144 60C144 57.7909 145.791 56 148 56H164C166.209 56 168 57.7909 168 60V68C168 70.2091 166.209 72 164 72H148C145.791 72 144 70.2091 144 68V60Z" fill="#${upgradeStats[4][5]}"/><path d="M172 60C172 57.7909 173.791 56 176 56H192C194.209 56 196 57.7909 196 60V68C196 70.2091 194.209 72 192 72H176C173.791 72 172 70.2091 172 68V60Z" fill="#${upgradeStats[4][6]}"/><path d="M200 60C200 57.7909 201.791 56 204 56H220C222.209 56 224 57.7909 224 60V68C224 70.2091 222.209 72 220 72H204C201.791 72 200 70.2091 200 68V60Z" fill="#${upgradeStats[4][7]}"/>`
		);

		SVG.push(
			`<path d="M4 34C4 31.7909 5.79086 30 8 30H24C26.2091 30 28 31.7909 28 34V42C28 44.2091 26.2091 46 24 46H8C5.79086 46 4 44.2091 4 42V34Z" fill="#${upgradeStats[5][0]}"/><path d="M32 34C32 31.7909 33.7909 30 36 30H52C54.2091 30 56 31.7909 56 34V42C56 44.2091 54.2091 46 52 46H36C33.7909 46 32 44.2091 32 42V34Z" fill="#${upgradeStats[5][1]}"/><path d="M60 34C60 31.7909 61.7909 30 64 30H80C82.2091 30 84 31.7909 84 34V42C84 44.2091 82.2091 46 80 46H64C61.7909 46 60 44.2091 60 42V34Z" fill="#${upgradeStats[5][2]}"/><path d="M88 34C88 31.7909 89.7909 30 92 30H108C110.209 30 112 31.7909 112 34V42C112 44.2091 110.209 46 108 46H92C89.7909 46 88 44.2091 88 42V34Z" fill="#${upgradeStats[5][3]}"/><path d="M116 34C116 31.7909 117.791 30 120 30H136C138.209 30 140 31.7909 140 34V42C140 44.2091 138.209 46 136 46H120C117.791 46 116 44.2091 116 42V34Z" fill="#${upgradeStats[5][4]}"/><path d="M144 34C144 31.7909 145.791 30 148 30H164C166.209 30 168 31.7909 168 34V42C168 44.2091 166.209 46 164 46H148C145.791 46 144 44.2091 144 42V34Z" fill="#${upgradeStats[5][5]}"/><path d="M172 34C172 31.7909 173.791 30 176 30H192C194.209 30 196 31.7909 196 34V42C196 44.2091 194.209 46 192 46H176C173.791 46 172 44.2091 172 42V34Z" fill="#${upgradeStats[5][6]}"/><path d="M200 34C200 31.7909 201.791 30 204 30H220C222.209 30 224 31.7909 224 34V42C224 44.2091 222.209 46 220 46H204C201.791 46 200 44.2091 200 42V34Z" fill="#${upgradeStats[5][7]}"/>`
		);

		SVG.push(
			`<path d="M4 8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V16C28 18.2091 26.2091 20 24 20H8C5.79086 20 4 18.2091 4 16V8Z" fill="#${upgradeStats[6][0]}"/><path d="M32 8C32 5.79086 33.7909 4 36 4H52C54.2091 4 56 5.79086 56 8V16C56 18.2091 54.2091 20 52 20H36C33.7909 20 32 18.2091 32 16V8Z" fill="#${upgradeStats[6][1]}"/><path d="M60 8C60 5.79086 61.7909 4 64 4H80C82.2091 4 84 5.79086 84 8V16C84 18.2091 82.2091 20 80 20H64C61.7909 20 60 18.2091 60 16V8Z" fill="#${upgradeStats[6][2]}"/><path d="M88 8C88 5.79086 89.7909 4 92 4H108C110.209 4 112 5.79086 112 8V16C112 18.2091 110.209 20 108 20H92C89.7909 20 88 18.2091 88 16V8Z" fill="#${upgradeStats[6][3]}"/><path d="M116 8C116 5.79086 117.791 4 120 4H136C138.209 4 140 5.79086 140 8V16C140 18.2091 138.209 20 136 20H120C117.791 20 116 18.2091 116 16V8Z" fill="#${upgradeStats[6][4]}"/><path d="M144 8C144 5.79086 145.791 4 148 4H164C166.209 4 168 5.79086 168 8V16C168 18.2091 166.209 20 164 20H148C145.791 20 144 18.2091 144 16V8Z" fill="#${upgradeStats[6][5]}"/><path d="M172 8C172 5.79086 173.791 4 176 4H192C194.209 4 196 5.79086 196 8V16C196 18.2091 194.209 20 192 20H176C173.791 20 172 18.2091 172 16V8Z" fill="#${upgradeStats[6][6]}"/><path d="M200 8C200 5.79086 201.791 4 204 4H220C222.209 4 224 5.79086 224 8V16C224 18.2091 222.209 20 220 20H204C201.791 20 200 18.2091 200 16V8Z" fill="#${upgradeStats[6][7]}"/>`
		);

		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="13" letter-spacing="0em"><tspan x="65.6138" y="172.007">Tower health</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="172.854">[7]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="63.0625" y="146.854">Tower shield</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="146.854">[6]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="67.0557" y="120.854">Build range</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="120.854">[5]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="13" letter-spacing="0em"><tspan x="61.8511" y="94.0068">Reload speed</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="94.8535">[4]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="65.1074" y="68.8535">Bullet range</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="68.8535">[3]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="13" letter-spacing="0em"><tspan x="66.6929" y="42.0068">Bullet speed</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="42.8535">[2]</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="61.1143" y="16.8535">Player speed</tspan></text>'
		);
		SVG.push(
			'<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="204.207" y="16.8535">[1]</tspan></text>'
		);
		SVG.push('</svg>');

		if (format === 'png') {
			const resvg = new Resvg(SVG.map((i) => i.replace('\n', '')).join(''), {
				font: {
					fontFiles: ['./src/Arial.ttf'],
					loadSystemFonts: false,
					defaultFontFamily: 'Arial',
				},
				fitTo: {
					mode: 'height',
					value: parseInt(height) || 1200,
				},
			});
			const pngData = resvg.render();
			const data = pngData.asPng();

			resolve({ data, format: 'png' });
		} else {
			resolve({
				format: 'svg',
				data: SVG.map((i) => i.replace('\n', '')).join(''),
			});
		}
	});
}
