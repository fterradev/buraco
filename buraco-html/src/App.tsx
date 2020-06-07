import React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import MainView from "./MainView";
import Div from "./Div";

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const onDragEnd = (result: DropResult) => {
  //TODO: reorder our column
};

function App() {
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <MainView />
      </DragDropContext>
    </Container>
  );
}

export default App;
