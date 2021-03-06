import { Card, CardSet, getNewDeck } from "../deck";
// @ts-ignore
import shuffle from "fisher-yates";

export interface PlayerCard extends Card {
  temp?: boolean
}

export type PlayerCardSet = PlayerCard[];

export interface PlayerOptions {
  name: string,
}

export type Player<C extends PlayerCard = PlayerCard> = PlayerOptions & {
  id: number,
  hand: C[],
  hasGoneOut: boolean, // bateu
  team: Team,
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

export const createTeam = (players: [Omit<Player, "team">, Omit<Player, "team">]) => {
  const team: Team = {
    players: players as any,
    sequences: [],
    hasPickedUpMorto: false,
  };
  team.players.forEach(player => {
    player.team = team;
  });
  return team;
}

let playerCount = 0;
const getNewPlayerId = () => {
  playerCount++;
  return playerCount;
}
export const createPlayer = (options: PlayerOptions) => {
  const player: Omit<Player, "team"> = {
    ...options,
    id: getNewPlayerId(),
    hand: [],
    hasGoneOut: false,
  };
  return player;
}

export default class Game {
  teams: [Team, Team];
  playersOrder: [Player, Player, Player, Player];
  whoseTurn: number;
  deck: CardSet = shuffle(getNewDeck());
  mesa: CardSet = [];
  mortos: CardSet[];
  gameOver = false;
  playerHasAlreadyDrawn = false;
  isLastTurn = false;
  isFirstDiscarding = true;

  constructor(teams: [Team, Team], startingPlayer?: number) {
    this.teams = teams;
    if (teams.length !== 2) {
      throw new Error(`teams length should be two, but instead is ${teams.length}`);
    }
    teams.forEach((team, index) => {
      if (team.players?.length !== 2) {
        throw new Error(`team at index ${index} has ${team.players?.length} players`);
      }
    });
    if (teams[0].players?.length !== 2 || teams[1].players?.length !== 2) {
      throw new Error(`some team has an unallowed number of players`);
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

  private finishTurn = () => {
    if (this.gameOver) {
      return;
    }
    if (this.deck.length === 0) {
      if (this.mortos.length > 0) {
        this.deck.concat(this.mortos.pop() as CardSet);
      }
    }
    if (!this.gameOver) {
      this.whoseTurn++;
      this.playerHasAlreadyDrawn = false;
      if (this.whoseTurn === 4) {
        this.whoseTurn = 0;
      }
    }
  }

  public getCurrentPlayer = () => {
    return this.playersOrder[this.whoseTurn];
  }

  public drawFromDeck = (player: Player) => {
    const card = this.deck.pop() as Card;
    player.hand = player.hand.concat(turnIntoPlayerCards([card], { temp: true }));
    this.playerHasAlreadyDrawn = true;
  }

  public drawFromMesa = (player: Player) => {
    const cards = this.mesa.splice(0);
    player.hand.concat(turnIntoPlayerCards(cards, { temp: true }));
    this.playerHasAlreadyDrawn = true;
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
          player.hand = turnIntoPlayerCards(this.mortos.pop() as CardSet);
        }
      } else {
        // TODO: verify team has a clean sequence
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
  }
}