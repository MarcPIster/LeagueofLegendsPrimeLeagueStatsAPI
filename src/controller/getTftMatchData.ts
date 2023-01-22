import axios from "axios";
import {IInfo, IMetadata, IParticipantInfo, ITftMatch} from "../models/tftMatchInterface";

export async function getTfTMatchByMatchId(matchId: string) {
    const url = 'https://europe.api.riotgames.com/tft/match/v1/matches/' + matchId +
        '?api_key=' + process.env.DEVELOPMENT_KEY;
    const matchData = await axios.get(url);
    if (matchData.status !== 200) {
        console.log(matchData.status);
        return;
    }
    const match = {} as ITftMatch;
    match.metadata = {} as IMetadata;
    match.info = {} as IInfo;
    match.metadata.matchId = matchData.data.metadata.match_id as string;
    match.metadata.dataVersion = matchData.data.metadata.data_version;
    match.info.gameLength = matchData.data.info.game_length;
    match.info.gameVariation = matchData.data.info.game_variation;
    match.info.gameVersion = matchData.data.info.game_version;
    match.info.queueId = matchData.data.info.queue_id;
    match.info.tftSetNumber = matchData.data.info.tft_set_number;
    match.info.gameDatetime = matchData.data.info.game_datetime;
    match.metadata.participants = matchData.data.metadata.participants;
    match.info.participants = [{} as IParticipantInfo];

    match.info.participants.pop();
    for (let participant of matchData.data.info.participants) {
        const participantInfo = {} as IParticipantInfo;
        participantInfo.goldLeft = participant.gold_left;
        participantInfo.lastRound = participant.last_round;
        participantInfo.level = participant.level;
        participantInfo.placement = participant.placement;
        participantInfo.playersEliminated = participant.players_eliminated;
        participantInfo.puuId = participant.puuid;
        participantInfo.timeEliminated = participant.time_eliminated;
        participantInfo.totalDamageToPlayers = participant.total_damage_to_players;
        participantInfo.companion = participant.companion;
        participantInfo.traits = participant.traits;
        participantInfo.units = participant.units;
        match.info.participants.push(participantInfo);
    }
    return match;
}