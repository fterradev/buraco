import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";
import GameContext, { gameProperties } from "./context";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function Game() {
  const game = useState(gameProperties);
  return (
    <Container>
      <GameContext.Provider value={gameProperties}>
        <MainView />
      </GameContext.Provider>
    </Container>
  );
}

export default Game;
