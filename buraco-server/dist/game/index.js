"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayer = exports.createTeam = void 0;
const deck_1 = require("../deck");
// @ts-ignore
const fisher_yates_1 = __importDefault(require("fisher-yates"));
// enum TurnStatus {
//   initial,
//   hasDrawn,
// }
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
exports.createTeam = () => {
    const team = {
        sequences: [],
        hasPickedUpMorto: false,
    };
    return team;
};
let playerCount = 0;
const getNewPlayerId = () => {
    playerCount++;
    return playerCount;
};
exports.createPlayer = (options) => {
    const player = Object.assign(Object.assign({}, options), { id: getNewPlayerId(), hand: [], hasGoneOut: false });
    return player;
};
class Game {
    constructor(teams, startingPlayer) {
        var _a, _b;
        this.deck = fisher_yates_1.default(deck_1.getNewDeck());
        this.mesa = [];
        this.gameOver = false;
        this.playerHasAlreadyDrawn = false;
        this.isLastTurn = false;
        this.isFirstDiscarding = true;
        this.finishTurn = () => {
            if (this.gameOver) {
                return;
            }
            if (this.deck.length === 0) {
                if (this.mortos.length > 0) {
                    this.deck.concat(this.mortos.pop());
                }
            }
            if (!this.gameOver) {
                this.whoseTurn++;
                this.playerHasAlreadyDrawn = false;
                if (this.whoseTurn === 4) {
                    this.whoseTurn = 0;
                }
            }
        };
        this.getCurrentPlayer = () => {
            return this.playersOrder[this.whoseTurn];
        };
        this.drawFromDeck = (player) => {
            const card = this.deck.pop();
            player.hand = player.hand.concat(turnIntoPlayerCards([card], { temp: true }));
            this.playerHasAlreadyDrawn = true;
        };
        this.drawFromMesa = (player) => {
            const cards = this.mesa.splice(0);
            player.hand.concat(turnIntoPlayerCards(cards, { temp: true }));
            this.playerHasAlreadyDrawn = true;
            if (this.deck.length === 0) {
                this.isLastTurn = true;
            }
        };
        this.createSequence = (player, sequece) => {
            sequece.forEach(card => {
                const index = player.hand.findIndex(handCard => handCard.id === card.id);
                player.hand.splice(index, 1);
            });
            player.team.sequences.push(sequece);
            this.handlePossiblyEmptyHand(player);
        };
        this.insertIntoSequence = (player, cards, sequenceIndex, resultantSequence) => {
            cards.forEach(card => {
                const index = player.hand.findIndex(handCard => handCard.id === card.id);
                player.hand.splice(index, 1);
            });
            player.team.sequences[sequenceIndex] = resultantSequence;
            this.handlePossiblyEmptyHand(player);
        };
        this.handlePossiblyEmptyHand = (player) => {
            if (player.hand.length === 0) {
                if (!player.team.hasPickedUpMorto && this.mortos.length > 0) {
                    player.team.hasPickedUpMorto = true;
                    if (!this.gameOver) {
                        player.hand = turnIntoPlayerCards(this.mortos.pop());
                    }
                }
                else {
                    this.gameOver = true;
                    player.hasGoneOut = true;
                }
            }
        };
        this.discard = ({ player, card }) => {
            const index = player.hand.findIndex(handCard => handCard.id === card.id);
            player.hand.splice(index, 1);
            const hasDiscardedTheSameDrawnCard = card.temp;
            this.mesa.push(card);
            makePlayerCardsDefinitive(player);
            if (this.isLastTurn) {
                this.gameOver = true;
            }
            this.handlePossiblyEmptyHand(player);
            if (!(this.isFirstDiscarding && hasDiscardedTheSameDrawnCard)) {
                this.finishTurn();
            }
            this.isFirstDiscarding = false;
        };
        this.teams = teams;
        if (teams.length !== 2) {
            throw new Error(`teams length should be two, but instead is ${teams.length}`);
        }
        teams.forEach((team, index) => {
            var _a, _b;
            if (((_a = team.players) === null || _a === void 0 ? void 0 : _a.length) !== 2) {
                throw new Error(`team at index ${index} has ${(_b = team.players) === null || _b === void 0 ? void 0 : _b.length} players`);
            }
        });
        if (((_a = teams[0].players) === null || _a === void 0 ? void 0 : _a.length) !== 2 || ((_b = teams[1].players) === null || _b === void 0 ? void 0 : _b.length) !== 2) {
            throw new Error(`some team has more or less than two players`);
        }
        this.playersOrder = [
            teams[0].players[0],
            teams[1].players[0],
            teams[0].players[1],
            teams[1].players[1]
        ];
        this.playersOrder.forEach(player => {
            player.hand = prepareHand(this.deck);
        });
        this.mortos = prepareMortos(this.deck);
        this.whoseTurn = startingPlayer || Math.floor(Math.random() * 4);
    }
}
exports.default = Game;
//# sourceMappingURL=index.js.map