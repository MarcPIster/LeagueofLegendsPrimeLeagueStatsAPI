import {getPlayersPUUIDbyName} from '../controller/getPlayerDataFromRiot';
import {IPlayer} from '../models/playerInterface';

export async function checkIfUserExists(playerName: string) {
    const player = await getPlayersPUUIDbyName(playerName);
    if (!player) {
        return false;
    }
    const playerModel = {} as IPlayer;
    playerModel.inGameName = player.name;
    playerModel.puuId = player.puuid;
    playerModel.summonerLevel = player.summonerLevel;
    playerModel.role = 'Not found';
    playerModel.status = 'Not found';
    playerModel.name = 'Not found';
    return playerModel;
}