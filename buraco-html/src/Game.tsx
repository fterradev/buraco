import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";
import GameContext, { IGameProperties, defaultGameProperties, IMove, IMoveInput } from "./context";
// import cloneDeep from "lodash/cloneDeep";
import clone from "lodash/clone";
import { MovingCard } from "./interfaces/MovingCard";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

let globalSource = 0;

const getSourceCards = (game: IGameProperties, source: number | string) => {
  let sourceCards: MovingCard[] = [];
  if (typeof source === 'number') {
    sourceCards = game.otherTeam[source].hand;
  }
  if (source === 'mesa') {
    sourceCards = game.mesaCards;
  }
  if (source === 'deck') {
    sourceCards = game.deck;
  }
  return sourceCards;
}

function Game() {
  console.log("render game");
  const [game, setGame] = useState<IGameProperties>(() => {
    const newGame = { ...defaultGameProperties };
    newGame.setMesaCards = (mesaCards) => {
      setGame((oldGame) => {
        console.log("setMesaCards");
        const newGame = clone(oldGame);
        newGame.mesaCards = mesaCards;
        return newGame;
      })
    }
    return newGame;
  });
  const f = (moveInput: IMoveInput) => {
    const {
      cardId,
      source,
    } = moveInput;
    setGame(oldGame => {
      const newGame = clone(oldGame)
      const sourceCards = getSourceCards(newGame, source);
      const card = sourceCards.find(card => card.id === cardId);
      if (!card) {
        console.error(`card ${cardId} not found in ${source}`);
        return newGame;
      }
      const enteringCard = clone(card);
      enteringCard.entering = true;
      card.leaving = true;

      // const move = initialGame.otherTeam[opponentIndex].moves[cardIndex];
      const moveId = card.id;
      // newGame.mesaCards.push(enteringCard);
      newGame.mesaCards = [...newGame.mesaCards, enteringCard];
      newGame.moves[moveId] = {
        input: moveInput,
        // TODO: Set Position outside of the move: setPosition(cardId, position)
        setPosition: (position) => {
          setGame((oldGame) => {
            console.log("setPosition");
            const newGame = clone(oldGame);
            console.log({cloned: newGame});
            newGame.moves[moveId].position = position;
            return newGame;
          });
        },
        removeLeftCard: () => {
          setGame((oldGame) => {
            console.log("removeLeftCard");
            const newGame = clone(oldGame);
            const sourceCards = getSourceCards(newGame, source);
            const index = sourceCards.findIndex(card => card.id === enteringCard.id);
            const newCards = [...sourceCards.slice(0, index), ...sourceCards.slice(index + 1)];
            if (typeof source === 'number') {
              newGame.otherTeam[source].hand = newCards;
            }
            if (source === 'mesa') {
              newGame.mesaCards = newCards;
            }
            if (source === 'deck') {
              newGame.deck = newCards;
            }
            const newMoves = newGame.moves;
            delete newMoves[moveId];
            return newGame;
          });
        }
      };
      console.log({newGame});
      return newGame;
    });
  };
  return (
    <Container>
      <GameContext.Provider value={game}>
        {/* <div>{game.mesaCards.length}</div> */}
        <MainView />
        <button onClick={() => {
          const source = globalSource;
          globalSource++;
          if (globalSource > 1) globalSource = 0;
          const index = 3;
          const cardId = game.otherTeam[source].hand[index].id;
          f({
            cardId,
            source,
            destination: 'mesa'
          });
        }}>
          go
        </button>
      </GameContext.Provider>
    </Container>
  );
}

export default Game;
