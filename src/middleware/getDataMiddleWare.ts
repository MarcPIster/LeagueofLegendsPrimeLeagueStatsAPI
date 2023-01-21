

export function checkIfUrlExists(body : any) {
    for (let key in body) {
        if (key === 'url') {
            return !!body[key].includes('https://www.primeleague.gg/leagues/teams/');

        }
    }
    return false;
}