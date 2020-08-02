import React from "react";
import styled from "styled-components";
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
      <MainView />
    </Container>
  );
}

export default App;
