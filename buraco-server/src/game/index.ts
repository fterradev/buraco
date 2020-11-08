import { Card, CardSet, getNewDeck } from "../deck";
import shuffle from "fisher-yates";

export interface PlayerCard extends Card {
  temp: boolean
}

export type PlayerCardSet = PlayerCard[];

export interface Player {
  id: number,
  name: string,
  hand: PlayerCardSet,
  team: Team,
  hasGoneOut: boolean,
}

export interface Team {
  players: [Player, Player];
  sequences: CardSet[];
  hasPickedUpMorto: boolean;
}

// enum TurnStatus {
//   initial,
//   hasDrawn,
// }

const turnIntoPlayerCards = (
  cards: CardSet,
  { temp } = { temp: false }
): PlayerCardSet => {
  return cards.map(card => ({
    ...card,
    temp
  }))
}

const makePlayerCardsDefinitive = (player: Player) => {
  player.hand.forEach(card => {
    card.temp = false;
  })
}

const prepareHand = (deck: CardSet): PlayerCardSet => {
  const hand = deck.splice(-11);
  return turnIntoPlayerCards(hand);
}

const prepareMortos = (deck: CardSet): [PlayerCardSet, PlayerCardSet] => {
  const morto1 = prepareHand(deck);
  const morto2 = prepareHand(deck);
  return [morto1, morto2];
}

export default class Game {
  teams: [Team, Team];
  playersOrder: [Player, Player, Player, Player];
  whoseTurn: number = Math.floor(Math.random() * 4);
  deck: CardSet = shuffle(getNewDeck());
  mesa: CardSet = [];
  mortos: CardSet[];
  gameOver = false;
  playerHasDrawn = false;
  isLastTurn = false;
  
  constructor(teams: [Team, Team]) {
    this.teams = teams;
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
  }

  private finishTurn = () => {
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
      this.playerHasDrawn = false;
      if (this.whoseTurn === 4) {
        this.whoseTurn = 0;
      }
    }
  }

  public drawFromDeck = (player: Player) => {
    const card = this.deck.pop();
    player.hand.concat(turnIntoPlayerCards([card], { temp: true }));
    this.playerHasDrawn = true;
  }

  public drawFromMesa = (player: Player) => {
    const cards = this.mesa.splice(0);
    player.hand.concat(turnIntoPlayerCards(cards, { temp: true }));
    this.playerHasDrawn = true;
    if (this.deck.length === 0) {
      this.isLastTurn = true;
    }
  }

  public createSequence = (player: Player, sequece: CardSet) => {
    sequece.forEach(card => {
      const index = player.hand.findIndex(handCard => handCard.id === card.id);
      player.hand.splice(index, 1);
    })
    player.team.sequences.push(sequece);
    this.handlePossiblyEmptyHand(player);
  }

  public insertIntoSequence = (player: Player, cards: CardSet, sequenceIndex: number, resultantSequence: CardSet) => {
    cards.forEach(card => {
      const index = player.hand.findIndex(handCard => handCard.id === card.id);
      player.hand.splice(index, 1);
    })
    player.team.sequences[sequenceIndex] = resultantSequence;
    this.handlePossiblyEmptyHand(player);
  }

  private handlePossiblyEmptyHand = (player: Player) => {
    if (player.hand.length === 0) {
      if (!player.team.hasPickedUpMorto && this.mortos.length > 0) {
        player.team.hasPickedUpMorto = true;
        if (!this.gameOver) {
          player.hand = turnIntoPlayerCards(this.mortos.pop());
        }
      } else {
        this.gameOver = true;
        player.hasGoneOut = true;
      }
    }
  }

  public discard = ({
    player,
    card
  }: {
    player: Player,
    card: PlayerCard
  }) => {
    const index = player.hand.findIndex(handCard => handCard.id === card.id);
    player.hand.splice(index, 1);

    const wasMesaEmpty = this.mesa.length === 0;
    const hasDiscardedTheSameDrawnCard = card.temp;
    this.mesa.push(card);
    makePlayerCardsDefinitive(player);
    if (this.isLastTurn) {
      this.gameOver = true;
    }

    this.handlePossiblyEmptyHand(player);
    if (!(wasMesaEmpty && hasDiscardedTheSameDrawnCard)) {
      this.finishTurn();
    }
  }
}