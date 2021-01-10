import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SeatSelectorUpDown = styled.div`
  display: flex;
  height: 6em;
  width: 40vmin;
  background-color: blue;
`;

export default function (props: PropsWithChildren<{}>) {
  return (
    <Container>
      <SeatSelectorUpDown>
        {props.children}
      </SeatSelectorUpDown>
    </Container>
  )
};
