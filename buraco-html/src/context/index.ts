import React from "react";
import deck, { Card, CardSet } from "buraco/dist/deck";
import Player from "../interfaces/Player";

export interface IPosition {
  x: number,
  y: number
}

export interface IMoveInput {
  source: string | number,
  destination: string | number,
}

export interface IMove {
  input: IMoveInput,
  position?: IPosition,
  setPosition: (position: IPosition) => void
};

interface OtherPlayer extends Player {
  
}

export interface IGameProperties {
  otherTeam: [OtherPlayer, OtherPlayer],
  partner: OtherPlayer,
  player: Player,
  mesaCards: CardSet,
  moves: Record<number, IMove>,
}

const mesaCards = deck.slice(0, 2);
const handCards = deck.slice(13, 13 + 11);
const otherCards1 = deck.slice(26, 26 + 11);
const otherCards2 = deck.slice(39, 39 + 11);
const otherCards3 = deck.slice(52, 52 + 11);

export const defaultGameProperties: IGameProperties = {
  otherTeam: [{
    id: 0,
    name: "Fulano",
    hand: otherCards1,
  }, {
    id: 1,
    name: "Ciclano",
    hand: otherCards2,
  }],
  partner: {
    id: 2,
    name: "Beltrano",
    hand: otherCards3,
  },
  player: {
    id: 3,
    name: "Eu mesmo",
    hand: handCards as any
  },
  mesaCards,
  moves: {}
};

const GameContext = React.createContext(defaultGameProperties);

export default GameContext;