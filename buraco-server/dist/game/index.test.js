"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importStar(require("."));
let team1;
let team2;
let player11;
let player12;
let player21;
let player22;
let game;
let testStartingPlayer;
const prepareGame = (() => {
    team1 = _1.createTeam();
    player11 = _1.createPlayer({ name: "John", team: team1 });
    player12 = _1.createPlayer({ name: "Paul", team: team1 });
    team1.players = [player11, player12];
    team2 = _1.createTeam();
    player21 = _1.createPlayer({ name: "George", team: team2 });
    player22 = _1.createPlayer({ name: "Ringo", team: team2 });
    team2.players = [player21, player22];
    game = new _1.default([team1, team2]);
    testStartingPlayer = game.playersOrder[game.whoseTurn];
});
describe("Class Game", () => {
    it("should create a game", () => {
        prepareGame();
        expect(player11.hand).toHaveLength(11);
        expect(player12.hand).toHaveLength(11);
        expect(player21.hand).toHaveLength(11);
        expect(player22.hand).toHaveLength(11);
        const { mortos, deck } = game;
        expect(mortos).toHaveLength(2);
        expect(mortos[0]).toHaveLength(11);
        expect(mortos[1]).toHaveLength(11);
        expect(deck).toHaveLength(2 * 52 - 6 * 11);
        expect(deck).toHaveLength(38);
    });
    describe("drawFromDeck", () => {
        it("should move card from deck to player's hand", () => {
            prepareGame();
            const { deck } = game;
            const deckLengthBefore = deck.length;
            const topCard = deck[deck.length - 1];
            game.drawFromDeck(testStartingPlayer);
            expect(testStartingPlayer.hand).toContainEqual(expect.objectContaining(Object.assign({}, topCard)));
            expect(deck.length).toBe(deckLengthBefore - 1);
            expect(testStartingPlayer.hand.length).toBe(12);
        });
    });
    describe("drawFromDeck", () => {
        it("should move card from deck to player's hand", () => {
            prepareGame();
            const { deck } = game;
            const deckLengthBefore = deck.length;
            const topCard = deck[deck.length - 1];
            expect(deck).toContainEqual(expect.objectContaining(Object.assign({}, topCard)));
            expect(testStartingPlayer.hand).not.toContainEqual(expect.objectContaining(Object.assign({}, topCard)));
            game.drawFromDeck(testStartingPlayer);
            expect(deck).not.toContainEqual(expect.objectContaining(Object.assign({}, topCard)));
            expect(testStartingPlayer.hand).toContainEqual(expect.objectContaining(Object.assign({}, topCard)));
            expect(deck.length).toBe(deckLengthBefore - 1);
            expect(testStartingPlayer.hand.length).toBe(12);
        });
    });
    describe("discard", () => {
        let drawnCard;
        const prepareDraw = () => {
            prepareGame();
            game.drawFromDeck(testStartingPlayer);
        };
        const testMovedToTheTable = (sameCard) => {
            const { mesa } = game;
            const { hand } = testStartingPlayer;
            const discardingCard = sameCard ? hand[hand.length - 1] : hand[0];
            expect(hand).toContainEqual(expect.objectContaining(Object.assign({}, discardingCard)));
            expect(mesa).not.toContainEqual(expect.objectContaining(Object.assign({}, discardingCard)));
            game.discard({ player: testStartingPlayer, card: discardingCard });
            expect(hand).not.toContainEqual(expect.objectContaining(Object.assign({}, discardingCard)));
            expect(mesa).toContainEqual(expect.objectContaining(Object.assign({}, discardingCard)));
        };
        describe("first turn of the game", () => {
            describe("when player discards any card other than the one he has just drawn", () => {
                beforeAll(() => {
                    prepareDraw();
                });
                it("the card is moved to the table", () => {
                    testMovedToTheTable(false);
                });
                it("player's turn has finished", () => {
                    expect(game.getCurrentPlayer()).not.toBe(testStartingPlayer);
                });
            });
            describe("when player discards the same card he has just drawn", () => {
                beforeAll(() => {
                    prepareDraw();
                });
                it("the card is moved to the table", () => {
                    testMovedToTheTable(true);
                });
                it("player's turn has not finished", () => {
                    expect(game.getCurrentPlayer()).toBe(testStartingPlayer);
                });
            });
        });
        describe("not the first turn of the game", () => {
            const prepare = () => {
                prepareDraw();
                const previousPlayer = testStartingPlayer;
                const discardingCard = previousPlayer.hand[0];
                game.discard({ player: previousPlayer, card: discardingCard });
                testStartingPlayer = game.getCurrentPlayer();
                game.drawFromDeck(testStartingPlayer);
            };
            describe("when player discards any card (even if it is the same one he has just drawn)", () => {
                beforeAll(prepare);
                it("the card is moved to the table", () => {
                    testMovedToTheTable(true);
                });
                it("player's turn has finished", () => {
                    expect(game.getCurrentPlayer()).not.toBe(testStartingPlayer);
                });
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map