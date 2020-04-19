export interface Card {
    id: number;
    back: number;
    suit: number;
    rank: number;
}
export declare type CardSet = Card[];
declare const deck: CardSet;
export default deck;
