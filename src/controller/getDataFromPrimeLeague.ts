import {IPlayer} from "../models/playerInterface";
import {ITeam} from "../models/teamInterface";

const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

async function getTeamMembers(url: string) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const contentPortraitGridL = $('.content-portrait-grid-l');
    const teamMembers = [{} as IPlayer];
    teamMembers.pop();

    contentPortraitGridL.find('li').each((i: number, elem: any) => {
        const name = $(elem).find('h3').text();
        const role = $(elem).find('.txt-subtitle').text();
        const status = $(elem).find('.txt-status-positive').text();
        const summonerName = $(elem).find('.txt-info span:first-child').text();
        const teamMember = {} as IPlayer;
        teamMember.name = name;
        teamMember.role = role;
        teamMember.status = status;
        teamMember.inGameName = summonerName;
        teamMembers.push(teamMember);
    });
    console.log(teamMembers);
    return teamMembers;
}

export async function getTeamData(url: string) {
    const team = {} as ITeam;
    team.players = await getTeamMembers(url);
    return team;
}

