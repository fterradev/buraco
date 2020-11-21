import { Card, CardSet } from "../deck";
export interface PlayerCard extends Card {
    temp: boolean;
}
export declare type PlayerCardSet = PlayerCard[];
export interface PlayerOptions {
    name: string;
    team: Team;
}
export declare type Player = PlayerOptions & {
    id: number;
    hand: PlayerCardSet;
    hasGoneOut: boolean;
};
export interface Team {
    players?: [Player, Player];
    sequences: CardSet[];
    hasPickedUpMorto: boolean;
}
export declare const createTeam: () => Team;
export declare const createPlayer: (options: PlayerOptions) => Player;
export default class Game {
    teams: [Team, Team];
    playersOrder: [Player, Player, Player, Player];
    whoseTurn: number;
    deck: CardSet;
    mesa: CardSet;
    mortos: CardSet[];
    gameOver: boolean;
    playerHasAlreadyDrawn: boolean;
    isLastTurn: boolean;
    isFirstDiscarding: boolean;
    constructor(teams: [Team, Team], startingPlayer?: number);
    private finishTurn;
    getCurrentPlayer: () => Player;
    drawFromDeck: (player: Player) => void;
    drawFromMesa: (player: Player) => void;
    createSequence: (player: Player, sequece: CardSet) => void;
    insertIntoSequence: (player: Player, cards: CardSet, sequenceIndex: number, resultantSequence: CardSet) => void;
    private handlePossiblyEmptyHand;
    discard: ({ player, card }: {
        player: Player;
        card: PlayerCard;
    }) => void;
}
