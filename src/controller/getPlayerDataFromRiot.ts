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
    if (playerData.data.status === 404) {
        return false;
    }
    return playerData.data as IPlayerRiotByName;

}

export async function fillPlayerData(team: ITeam) {
    for (let player of team.players) {
        const playerRiot = await getPlayersPUUIDbyName(player.inGameName);
        if (playerRiot) {
            player.puuId = playerRiot.puuid;
            player.summonerLevel = playerRiot.summonerLevel;
        } else {
            player.puuId = 'Not found';
            player.summonerLevel = -1;
        }
    }
    return team;
}

export async function getNormalMatchesByPuuid(puuid: string) {
    const url = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid +
        '/ids?type=normal&start=0&count=20&api_key=' + process.env.DEVELOPMENT_KEY;
    const matches = await axios.get(url);
    return matches.data;
}

export async function getMatchDataTfTbyPuuid(puuid: string, howMany?: number) {
    const howManyMatches = howMany ? howMany : 20;
    const url = 'https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/' + puuid +
        '/ids?start=0&count='+ howManyMatches +'&api_key=' + process.env.DEVELOPMENT_KEY;
    const matches = await axios.get(url);
    return matches.data;
}
