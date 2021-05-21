import Game, { createPlayer, createTeam, Player, Team } from ".";
import { Card } from "../deck";

let team1: Team;
let team2: Team;
let player11: Player;
let player12: Player;
let player21: Player;
let player22: Player;
let game: Game;
let testStartingPlayer: Player;
const prepareGame = (() => {
  team1 = createTeam([createPlayer({ name: "John" }), createPlayer({ name: "Paul" })]);
  player11 = team1.players[0];
  player12 = team1.players[1];

  team2 = createTeam([createPlayer({ name: "George" }), createPlayer({ name: "Ringo" })]);
  player21 = team2.players[0];
  player22 = team2.players[1];

  game = new Game([team1, team2]);
  testStartingPlayer = game.playersOrder[game.whoseTurn];
})

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
  })

  describe("drawFromDeck", () => {
    it("should move card from deck to player's hand", () => {
      prepareGame();
      const { deck } = game;
      const deckLengthBefore = deck.length;
      const topCard = deck[deck.length - 1];
      game.drawFromDeck(testStartingPlayer);
      expect(testStartingPlayer.hand).toContainEqual(expect.objectContaining({ ...topCard }));
      expect(deck.length).toBe(deckLengthBefore - 1);
      expect(testStartingPlayer.hand.length).toBe(12);
    })
  })

  describe("drawFromDeck", () => {
    it("should move card from deck to player's hand", () => {
      prepareGame();
      const { deck } = game;
      const deckLengthBefore = deck.length;
      const topCard = deck[deck.length - 1];
      expect(deck).toContainEqual(expect.objectContaining({ ...topCard }));
      expect(testStartingPlayer.hand).not.toContainEqual(expect.objectContaining({ ...topCard }));
      game.drawFromDeck(testStartingPlayer);
      expect(deck).not.toContainEqual(expect.objectContaining({ ...topCard }));
      expect(testStartingPlayer.hand).toContainEqual(expect.objectContaining({ ...topCard }));
      expect(deck.length).toBe(deckLengthBefore - 1);
      expect(testStartingPlayer.hand.length).toBe(12);
    })
  })

  describe("discard", () => {
    let drawnCard: Card;
    const prepareDraw = () => {
      prepareGame();
      game.drawFromDeck(testStartingPlayer);
    };
    const testMovedToTheTable = (sameCard: boolean) => {
      const { mesa } = game;
      const { hand } = testStartingPlayer;
      const discardingCard = sameCard ? hand[hand.length - 1] : hand[0];
      expect(hand).toContainEqual(expect.objectContaining({ ...discardingCard }));
      expect(mesa).not.toContainEqual(expect.objectContaining({ ...discardingCard }));
      game.discard({ player: testStartingPlayer, card: discardingCard });
      expect(hand).not.toContainEqual(expect.objectContaining({ ...discardingCard }));
      expect(mesa).toContainEqual(expect.objectContaining({ ...discardingCard }));
    }
    describe("first turn of the game", () => {
      describe("when player discards any card other than the one he has just drawn", () => {
        beforeAll(() => {
          prepareDraw();
        });
        it("the card is moved to the table", () => {
          testMovedToTheTable(false);
        })
        it("player's turn has finished", () => {
          expect(game.getCurrentPlayer()).not.toBe(testStartingPlayer);
        })
      })
      describe("when player discards the same card he has just drawn", () => {
        beforeAll(() => {
          prepareDraw();
        });
        it("the card is moved to the table", () => {
          testMovedToTheTable(true);
        })
        it("player's turn has not finished", () => {
          expect(game.getCurrentPlayer()).toBe(testStartingPlayer);
        })
      })
    })
    describe("not the first turn of the game", () => {
      const prepare = () => {
        prepareDraw();
        const previousPlayer = testStartingPlayer;
        const discardingCard = previousPlayer.hand[0];
        game.discard({ player: previousPlayer, card: discardingCard });
        testStartingPlayer = game.getCurrentPlayer();
        game.drawFromDeck(testStartingPlayer);
      }
      describe("when player discards any card (even if it is the same one he has just drawn)", () => {
        beforeAll(prepare);
        it("the card is moved to the table", () => {
          testMovedToTheTable(true);
        })
        it("player's turn has finished", () => {
          expect(game.getCurrentPlayer()).not.toBe(testStartingPlayer);
        })
      })
    })
  })
})