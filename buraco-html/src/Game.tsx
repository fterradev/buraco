import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";
import GameContext, { IGameProperties, defaultGameProperties } from "./context";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function Game() {
  const [game, setGame] = useState<IGameProperties>(() => {
    const initialGame = { ...defaultGameProperties };
    const opponentIndex = 0;
    const cardIndex = 0;
    const card = initialGame.otherTeam[opponentIndex].hand[cardIndex];
    // const move = initialGame.otherTeam[opponentIndex].moves[cardIndex];
    initialGame.otherTeam[opponentIndex].moves[cardIndex] = {
      destination: "mesa",
      remove: () => {
        setGame((game) => {
          game.otherTeam[opponentIndex].hand.splice(cardIndex, 1);
          return game;
        });
      },
      insert: () => {
        setGame((game) => {
          game.mesaCards.push(card);
          delete game.otherTeam[opponentIndex].moves[cardIndex];
          return game;
        });
      }
    }
    return initialGame;
  });
  return (
    <Container>
      <GameContext.Provider value={game}>
        <MainView />
      </GameContext.Provider>
    </Container>
  );
}

export default Game;
