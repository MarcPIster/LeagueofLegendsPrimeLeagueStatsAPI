export interface IMetadata {
    dataVersion: string;
    matchId: string;
    participants: [string];
}

export interface ICompanion {
    contentId: string;
    skinId: number;
    itemId: number;
    species: string;

}

export interface ITrait {
    name: string;
    numUnits: number;
    style: number;
    tierCurrent: number;
    tierTotal: number;
}

export interface IUnit {
    characterId: string;
    items: [number];
    rarity: number;
    tier: number;
    chosen?: string;
}

export interface IParticipantInfo {
    companion: ICompanion;
    goldLeft: number;
    lastRound: number;
    level: number;
    placement: number;
    playersEliminated: number;
    puuId: string;
    timeEliminated: number;
    totalDamageToPlayers: number;
    traits: [ITrait];
    units: [IUnit];

}

export interface IInfo {
    gameDatetime: number;
    gameLength: number;
    gameVariation: string;
    gameVersion: string;
    participants: [IParticipantInfo];
    queueId: number;
    tftSetNumber: number;
}
export interface ITftMatch {
    metadata: IMetadata;
    info: IInfo;
}