export interface IPlayer {
   name : string;
   role : string;
   status : string;
   inGameName : string;
   elo?: string; // optional
   puuId?: string; // optional
   summonerLevel?: number; // optional
   position?: string; // optional
    games?: [string]; // optional
}

export interface IPlayerRiotByName {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}
