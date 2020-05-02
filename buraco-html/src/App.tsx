import React from "react";
import styled from "styled-components";
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend";
// import Backend from "react-dnd-touch-backend";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <DndProvider backend={Backend}>
        <MainView />
      </DndProvider>
    </Container>
  );
}

export default App;
