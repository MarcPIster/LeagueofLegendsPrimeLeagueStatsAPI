import axios from "axios";
import {ITeam} from "../models/teamInterface";
import {IPlayerRiotByName} from "../models/playerInterface";

const dotenv = require('dotenv');


dotenv.config();

export async function getPlayersPUUIDbyName(name: string) {
    const url = 'https://'+ process.env.REGION + '/lol/summoner/v4/summoners/by-name/' + name +
        '+?api_key=' + process.env.DEVELOPMENT_KEY;
    const playerData  = await axios.get(url);
    console.log(playerData.data);
    return playerData.data as IPlayerRiotByName;

}

export async function fillPlayerData(team: ITeam) {
    for (let player of team.players) {
        const playerRiot = await getPlayersPUUIDbyName(player.inGameName);
        player.puuId = playerRiot.puuid;
        player.summonerLevel = playerRiot.summonerLevel;
    }
    return team;
}