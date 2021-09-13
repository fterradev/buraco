import React from "react";
import deck from "buraco/dist/deck";
import Player from "../interfaces/Player";
import { MovingCard } from "../interfaces/MovingCard";

export interface IPosition {
  x: number,
  y: number,
  position: "top" | "left" | "right" | "bottom"
}

export interface IMoveInput {
  cardId: number,
  source: string | number,
  destination: string | number,
}

export interface IMove {
  input: IMoveInput,
  position?: IPosition,
  setPosition: (position: IPosition) => void,
  removeLeftCard: () => void,
};

interface OtherPlayer extends Player {
  
}

export interface IGameProperties {
  otherTeam: [OtherPlayer, OtherPlayer],
  partner: OtherPlayer,
  player: Player,
  deck: MovingCard[],
  mesaCards: MovingCard[],
  setMesaCards: (mesaCards: MovingCard[]) => void,
  moves: Record<number, IMove>,
}

const mesaCards = deck.slice(0, 8);
const handCards = deck.slice(13, 13 + 11);
const otherCards1 = deck.slice(26, 26 + 11);
const otherCards2 = deck.slice(39, 39 + 11);
const otherCards3 = deck.slice(52, 52 + 11);
const gameDeck = deck.slice(65);

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
  deck: gameDeck,
  mesaCards,
  moves: {},
  setMesaCards: () => {
    
  }
};

const GameContext = React.createContext(defaultGameProperties);

export default GameContext;