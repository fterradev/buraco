import React from "react";
import deck, { CardSet } from "buraco/dist/deck";
import Player from "../interfaces/Player";

export interface IMove {
  destination: string,
  remove: () => void,
  insert: () => void,
};

interface OtherPlayer extends Player {
  moves: Record<number, IMove>
}

export interface IGameProperties {
  otherTeam: [OtherPlayer, OtherPlayer],
  partner: OtherPlayer,
  player: Player,
  mesaCards: CardSet
}

const mesaCards = deck.slice(0, 12);
const handCards = deck.slice(13, 13 + 11);
const otherCards1 = deck.slice(26, 26 + 11);
const otherCards2 = deck.slice(39, 39 + 11);
const otherCards3 = deck.slice(52, 52 + 11);

export const defaultGameProperties: IGameProperties = {
  otherTeam: [{
    id: 0,
    name: "Fulano",
    hand: otherCards1,
    moves: {}
  }, {
    id: 1,
    name: "Ciclano",
    hand: otherCards2,
    moves: {}
  }],
  partner: {
    id: 2,
    name: "Beltrano",
    hand: otherCards3,
    moves: {}
  },
  player: {
    id: 3,
    name: "Eu mesmo",
    hand: handCards as any
  },
  mesaCards
};

const GameContext = React.createContext(defaultGameProperties);

export default GameContext;