const originalLetters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
const outputLetters = [
	'𝙰',
	'𝙱',
	'𝙲',
	'𝙳',
	'𝙴',
	'𝙵',
	'𝙶',
	'𝙷',
	'𝙸',
	'𝙹',
	'𝙺',
	'𝙻',
	'𝙼',
	'𝙽',
	'𝙾',
	'𝙿',
	'𝚀',
	'𝚁',
	'𝚂',
	'𝚃',
	'𝚄',
	'𝚅',
	'𝚆',
	'𝚇',
	'𝚈',
	'𝚉',
	'𝚊',
	'𝚋',
	'𝚌',
	'𝚍',
	'𝚎',
	'𝚏',
	'𝚐',
	'𝚑',
	'𝚒',
	'𝚓',
	'𝚔',
	'𝚕',
	'𝚖',
	'𝚗',
	'𝚘',
	'𝚙',
	'𝚚',
	'𝚛',
	'𝚜',
	'𝚝',
	'𝚞',
	'𝚟',
	'𝚠',
	'𝚡',
	'𝚢',
	'𝚣',
];

const numbers = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

const element = document.getElementById('element');
const generateButton = document.getElementById('generate');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy');
const outputContainer = document.getElementById('output-container');

window.onload = async () => {
	const data = await fetch('https://neelpatel05.pythonanywhere.com/');
	const res = await data.json();
	res
		.map((i) => i.name)
		.sort()
		.forEach((el) => {
			element.add(new Option(el));
		});
	generateButton.onclick = () => {
		outputContainer.classList.remove('hidden');
		const name = document.getElementById('element').value;
		const atomicNumber = res.find((el) => el.name === name).atomicNumber;

		output.value =
			name
				.split('')
				.map((letter) => {
					return outputLetters[originalLetters.indexOf(letter)];
				})
				.join('') +
			atomicNumber
				.toString()
				.split('')
				.map((number) => {
					return numbers[number];
				})
				.join('');
	};
	copyButton.onclick = () => {
		output.select();
		output.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(output.value);
	};
};
