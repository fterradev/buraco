import { Card, CardSet } from "../deck";
export interface PlayerCard extends Card {
    temp: boolean;
}
export declare type PlayerCardSet = PlayerCard[];
export interface Player {
    id: number;
    name: string;
    hand: PlayerCardSet;
    team: Team;
}
export interface Team {
    players: [Player, Player];
    sequences: CardSet[];
}
