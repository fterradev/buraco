import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SeatSelectorUpDown = styled.div`
  display: flex;
  height: 6em;
  width: 40vmin;
  background-color: blue;
`;

const SeatSelectorSides = styled.div`
  display: flex;
  width: 6em;
  background-color: blue;
  height: 40vmin;
  // margin: 6em 0;
`;

export default function (props: PropsWithChildren<{}>) {
  return (
    <Container>
      <SeatSelectorSides>
        {props.children}
      </SeatSelectorSides>
    </Container>
  )
};
