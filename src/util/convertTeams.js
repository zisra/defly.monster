export function convertTeams(teams) {
    const output = {};
    for (const team in teams) {
        const players = {};
        teams[team].forEach((t) => {
            players[t.value] = t.note;
        });
        output[team] = players;
    }
    return output;
}