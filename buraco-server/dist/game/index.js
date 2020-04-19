"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fisher_yates_1 = __importDefault(require("fisher-yates"));
const turnIntoPlayerCards = (cards, { temp } = { temp: false }) => {
    return cards.map(card => (Object.assign(Object.assign({}, card), { temp })));
};
const makePlayerCardsDefinitive = (player) => {
    player.hand.forEach(card => {
        card.temp = false;
    });
};
const prepareHand = (deck) => {
    const hand = deck.splice(-11);
    return turnIntoPlayerCards(hand);
};
const prepareMortos = (deck) => {
    const morto1 = prepareHand(deck);
    const morto2 = prepareHand(deck);
    return [morto1, morto2];
};
const game = ({ teams, initialDeck, }) => {
    const deck = fisher_yates_1.default(initialDeck);
    const mortos = prepareMortos(deck);
    const mesa = [];
    teams.forEach(team => {
        team.players.forEach(player => {
            player.hand = prepareHand(deck);
        });
    });
    const playersOrder = [
        teams[0].players[0],
        teams[1].players[0],
        teams[0].players[1],
        teams[1].players[1]
    ];
    teams.forEach((team, index) => {
        const { players } = team;
        players.forEach(player => {
            player.team = team;
        });
    });
    let whoseTurn = Math.floor(Math.random() * 4);
    let gameOver = false;
    const finishTurn = () => {
        if (deck.length === 0) {
            if (mortos.length > 0) {
                deck.concat(mortos.pop());
            }
            else {
                gameOver = true;
            }
        }
        if (!gameOver) {
            whoseTurn++;
            if (whoseTurn === 4) {
                whoseTurn = 0;
            }
        }
    };
    const drawFromDeck = (player) => {
        const card = deck.pop();
        player.hand.concat(turnIntoPlayerCards([card], { temp: true }));
    };
    const drawFromMesa = (player) => {
        const cards = mesa.splice(0);
        player.hand.concat(turnIntoPlayerCards(cards, { temp: true }));
    };
    const createSequence = (player, cards) => {
        cards.forEach(card => {
            const index = player.hand.findIndex(handCard => handCard.id === card.id);
            player.hand.splice(index, 1);
        });
        player.team.sequences.push(cards);
        handlePossiblyEmptyHand(player);
    };
    const insertIntoSequence = (player, cards, sequenceIndex, resultantSequence) => {
        cards.forEach(card => {
            const index = player.hand.findIndex(handCard => handCard.id === card.id);
            player.hand.splice(index, 1);
        });
        player.team.sequences[sequenceIndex] = resultantSequence;
        handlePossiblyEmptyHand(player);
    };
    const handlePossiblyEmptyHand = (player) => {
        if (player.hand.length === 0) {
            if (mortos.length > 0) {
                player.hand = turnIntoPlayerCards(mortos.pop());
            }
            else {
                gameOver = true;
            }
        }
    };
    const discard = ({ player, card }) => {
        const index = player.hand.findIndex(handCard => handCard.id === card.id);
        player.hand.splice(index, 1);
        const wasMesaEmpty = mesa.length === 0;
        mesa.push(card);
        makePlayerCardsDefinitive(player);
        handlePossiblyEmptyHand(player);
        if (!wasMesaEmpty) {
            finishTurn();
        }
    };
};
//# sourceMappingURL=index.js.map