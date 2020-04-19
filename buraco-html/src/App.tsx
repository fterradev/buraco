import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import MainView from "./MainView";

const Container = styled.div`
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
