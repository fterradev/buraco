export interface Card {
  id: number,
  back: number,
  suit: number,
  rank: number
}

export type CardSet = Card[];

const deck: CardSet = [];

let cardId = 0;
for (let back = 0; back < 2; back++) {
  for (let suit = 0; suit < 4; suit++) {
    for (let rank = 0; rank < 13; rank++) {
      const card: Card = {id: cardId, back, suit, rank};
      deck.push(card);
      cardId++;
    }
  }
}

export default deck;