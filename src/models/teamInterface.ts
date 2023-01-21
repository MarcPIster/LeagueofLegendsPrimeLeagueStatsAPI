import {IPlayer} from "./playerInterface";
export interface ITeam {
    name: string;
    logo: string;
    players: IPlayer[];
}