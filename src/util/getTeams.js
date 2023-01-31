const WebSocket = require('ws');
const config = require('../config.js');

function getTeams(input) {
	return new Promise((resolve, reject) => {
		const gamesPlayed = 0;
		const username = 'Player';
		const skin = 1;
		function writeString(buffer, idx, str) {
			buffer.setUint8(idx, str.length);
			for (let i = 0; i < str.length; i++) {
				const o = str.charCodeAt(i);
				buffer.setUint8(idx + 1 + 2 * i + 1, 255 & o);
				buffer.setUint8(idx + 1 + 2 * i + 0, o >>> 8);
			}
		}
		function readString(buffer, idx) {
			for (var n = buffer.getUint8(idx++), i = '', o = 0; o < n; o++) {
				var a =
					buffer.getUint8(idx + 2 * o + 1) |
					(buffer.getUint8(idx + 2 * o + 0) << 8);
				i += String.fromCharCode(a);
			}
			return i;
		}

		function getAddress(input) {
			const address = config.REGION_LIST.find((i) => i.alias === input.region);
			if (!address) reject('Server needs to be use, usw, or eu');
			return {
				ws: `wss://${address.ws}.defly.io/${input.port}`,
				region: address.region,
			};
		}

		async function join() {
			const regionFromInput = getAddress(input);
			let socket = new WebSocket(regionFromInput.ws, {
				handshakeTimeout: 2000,
			});

			socket.binaryType = 'arraybuffer';
			socket.addEventListener('open', async (e) => {
				let data = await fetch(
					'https://s.defly.io/?r=USE1&m=1&u=Player&fu=Player'
				);
				let sessionData = await data.text();

				const session = sessionData.split(' ')[1];
				let socketBuffer = new DataView(
					new ArrayBuffer(
						2 + 2 * username.length + 1 + 2 * session.length + 4 + 4
					)
				);
				socketBuffer.setUint8(0, 1);
				writeString(socketBuffer, 1, username);
				writeString(socketBuffer, 2 + 2 * username.length, session);
				socketBuffer.setInt32(
					2 + 2 * username.length + 1 + 2 * session.length,
					skin
				);
				socketBuffer.setInt32(
					2 + 2 * username.length + 1 + 2 * session.length + 4,
					gamesPlayed
				);
				socket.send(socketBuffer.buffer);
			});

			socket.addEventListener('error', (err) => {
				reject(err.message);
			});

			let members = [];
			socket.addEventListener('message', (event) => {
				const message = new DataView(event.data);
				const code = message.getUint8(0);

				if (code === 29) {
					const ID = message.getInt32(1);
					let currentUsername = readString(message, 5);
					let currentSkin = message.getInt32(6 + 2 * currentUsername.length);
					let currentTeam = -1;
					let currentBadge =
						message.byteLength >= 6 + 2 * currentUsername.length + 4 + 4 + 1 &&
						(S = message.getUint8(6 + 2 * currentUsername.length + 4 + 4));

					message.byteLength >= 6 + 2 * currentUsername.length + 4 + 4 - 1 &&
						(currentTeam = message.getInt32(
							6 + 2 * currentUsername.length + 4
						));

					members.push({
						currentUsername,
						ID,
						currentSkin,
						currentTeam,
						currentBadge,
					});
				} else if (code === 35) {
					const results = [];
					const maxSize = message.getUint8(1);
					const teamCount = message.getUint8(2);

					let offset = 3;

					for (let i = 0; i < teamCount; i++) {
						const teamID = message.getUint32(offset);
						offset += 4;

						const mapPercent = Math.max(message.getFloat32(offset), 0);
						offset += 4;

						const available = message.getUint8(offset) != 0;
						offset += 1;

						const memberLimit = message.getUint8(offset);
						offset += 1;

						const players = [];

						for (let j = 0; j < memberLimit; j++) {
							const playerID = message.getInt32(offset);
							players.push({
								ID: playerID,
								name: null,
							});
							offset += 4;
						}

						const result = {
							teamID,
							mapPercent,
							maxSize,
							available,
							players,
						};

						results.push(result);
					}
					members.forEach((i) => {
						let team = results.find((o) => o.teamID === i.currentTeam);
						let member = team.players.find((o) => o.ID === i.ID);
						member.name = i.currentUsername;
						member.skin = i.currentSkin;
						member.badge = i.currentBadge;
					});

					results.forEach((i) => {
						i.team = config.TEAM_COLORS[i.teamID];
						i.team.ID = i.teamID;
						delete i.teamID;
					});
					resolve(results);
					socket.close();
				}
			});
		}

		join();
	});
}

exports.getTeams = getTeams;
