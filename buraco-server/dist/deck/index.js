"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewDeck = void 0;
const deck = [];
let cardId = 0;
for (let back = 0; back < 2; back++) {
    for (let suit = 0; suit < 4; suit++) {
        for (let rank = 0; rank < 13; rank++) {
            const card = { id: cardId, back, suit, rank };
            deck.push(card);
            cardId++;
        }
    }
}
exports.default = deck;
exports.getNewDeck = () => {
    const deck = [];
    let cardId = 0;
    for (let back = 0; back < 2; back++) {
        for (let suit = 0; suit < 4; suit++) {
            for (let rank = 0; rank < 13; rank++) {
                const card = { id: cardId, back, suit, rank };
                deck.push(card);
                cardId++;
            }
        }
    }
    return deck;
};
//# sourceMappingURL=index.js.map