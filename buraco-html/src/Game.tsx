import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";
import GameContext, { IGameProperties, defaultGameProperties } from "./context";
// import cloneDeep from "lodash/cloneDeep";
import clone from "lodash/clone";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

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
  const f = () => {
    setGame(oldGame => {
      const newGame = clone(oldGame)
      const opponentIndex = 0;
      const cardIndex = 0;
      const card = newGame.otherTeam[opponentIndex].hand[cardIndex];
      const enteringCard = clone(card);
      enteringCard.entering = true;
      card.leaving = true;

      // const move = initialGame.otherTeam[opponentIndex].moves[cardIndex];
      const moveIndex = card.id;
      newGame.mesaCards.push(enteringCard);
      newGame.moves[moveIndex] = {
        input: {
          source: opponentIndex,
          destination: "mesa",
        },
        // TODO: Set Position outside of the move: setPosition(cardId, position)
        setPosition: (position) => {
          setGame((oldGame) => {
            console.log("setPosition");
            const newGame = clone(oldGame);
            console.log({cloned: newGame});
            newGame.moves[moveIndex].position = position;
            return newGame;
          })
        }
        // remove: (id) => {
        //   setGame(({...game}) => {
        //     console.log("setGame");
        //     game.otherTeam[opponentIndex].hand = [...game.otherTeam[opponentIndex].hand];
        //     const removed = game.otherTeam[opponentIndex].hand.splice(cardIndex, 1);
        //     console.log(id, {removed});
        //     // console.trace();
        //     // console.log({moves: game.moves});
        //     return game;
        //   });
        // },
        // finish: () => {
        //   console.log("setGame");
        //   game.moves.splice(moveIndex, 1);
        // },
        // insert: () => {
        //   setGame(({...game}) => {
        //     console.log("setGame");
        //     console.log("inserting");
        //     game.mesaCards = [...game.mesaCards, card];
        //     console.log({length: game.mesaCards.length});
        //     // delete game.otherTeam[opponentIndex].moves[cardIndex];
        //     return game;
        //   });
        // },
      };
      console.log({newGame});
      return newGame;
    });
  }
  return (
    <Container>
      <GameContext.Provider value={game}>
        {/* <div>{game.mesaCards.length}</div> */}
        <MainView />
        <button onClick={f}>
          go
        </button>
      </GameContext.Provider>
    </Container>
  );
}

export default Game;
