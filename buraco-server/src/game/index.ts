import initialDeck, { Card, CardSet } from "../deck";
import shuffle from "fisher-yates";

export interface PlayerCard extends Card {
  temp: boolean
}

export type PlayerCardSet = PlayerCard[];

export interface Player {
  id: number,
  name: string,
  hand: PlayerCardSet,
  team: Team
}

export interface Team {
  players: [Player, Player];
  sequences: CardSet[];
}

// enum TurnStatus {
//   initial,
//   hasDrawn,
// }

interface Game {
  teams: [Team, Team],
  deck: CardSet,
  whoseTurn: number,
  // turnStatus: 
  mesa: CardSet,
  playersOrder: [Player, Player, Player, Player]
}

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

const game = ({
  teams,
  initialDeck,
}: {
  teams: [Team, Team],
  initialDeck: CardSet
}) => {
  const deck: CardSet = shuffle(initialDeck);
  const mortos: CardSet[] = prepareMortos(deck);
  const mesa: CardSet = [];

  teams.forEach(team => {
    team.players.forEach(player => {
      player.hand = prepareHand(deck);
    })
  })

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
    })
  })
  let whoseTurn = Math.floor(Math.random() * 4);

  let gameOver = false;

  const finishTurn = () => {
    if (deck.length === 0) {
      if (mortos.length > 0) {
        deck.concat(mortos.pop());
      } else {
        gameOver = true;
      }
    }
    if (!gameOver) {
      whoseTurn++;
      if (whoseTurn === 4) {
        whoseTurn = 0;
      }
    }
  }

  const drawFromDeck = (player: Player) => {
    const card = deck.pop();
    player.hand.concat(turnIntoPlayerCards([card], { temp: true }));
  }

  const drawFromMesa = (player: Player) => {
    const cards = mesa.splice(0);
    player.hand.concat(turnIntoPlayerCards(cards, { temp: true }));
  }

  const createSequence = (player: Player, cards: CardSet) => {
    cards.forEach(card => {
      const index = player.hand.findIndex(handCard => handCard.id === card.id);
      player.hand.splice(index, 1);
    })
    player.team.sequences.push(cards);
    handlePossiblyEmptyHand(player);
  }

  const insertIntoSequence = (player: Player, cards: CardSet, sequenceIndex: number, resultantSequence: CardSet) => {
    cards.forEach(card => {
      const index = player.hand.findIndex(handCard => handCard.id === card.id);
      player.hand.splice(index, 1);
    })
    player.team.sequences[sequenceIndex] = resultantSequence;
    handlePossiblyEmptyHand(player);
  }

  const handlePossiblyEmptyHand = (player: Player) => {
    if (player.hand.length === 0) {
      if (mortos.length > 0) {
        player.hand = turnIntoPlayerCards(mortos.pop());
      } else {
        gameOver = true;
      }
    }
  }

  const discard = ({
    player,
    card
  }: {
    player: Player,
    card: PlayerCard
  }) => {
    const index = player.hand.findIndex(handCard => handCard.id === card.id);
    player.hand.splice(index, 1);

    const wasMesaEmpty = mesa.length === 0;
    const hasDiscardedTheSameDrawnCard = card.temp;
    mesa.push(card);

    makePlayerCardsDefinitive(player);
    handlePossiblyEmptyHand(player);
    if (!(wasMesaEmpty && hasDiscardedTheSameDrawnCard)) {
      finishTurn();
    }
  }
}