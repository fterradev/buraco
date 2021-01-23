import React from "react";
import styled from "styled-components";
import { Card as CardType } from "buraco/dist/deck";

interface Props {
  readonly position: string;
};
const borderWidth = "1px";
const width = "2em";
const height = "2.5em";
const marginCard = `calc(-0.75 * var(--card-width))`;
// const widthSmall = `calc(100%/11 - (${marginRight} + 2*${borderWidth}))`;
// const marginCardSmall = `calc(-0.75 * (100%/11 - (${marginRight} + 2*${borderWidth})))`;
const Container = styled.div<Props>`
  background-color: beige;
  display: flex;
  /* flex-direction: column; */
  flex-direction: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "row" : "column"};
  /* transform: rotate(${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "-90deg" : "0"}); */
  font-family: card-characters;
  font-size: 1.5rem;
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 2px;
  /* width: ${width}; */
  width: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "var(--card-height)" : "var(--card-width)"};
  /* margin-right: calc(-0.75 * ${width}); */
  margin-right: ${({ position }) => position === "top" ? marginCard : "initial"};
  margin-top: ${({ position }) => position === "left" ? marginCard : "initial"};
  margin-bottom: ${({ position }) => position === "right" ? marginCard : "initial"};
  height: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "var(--card-width)" : "var(--card-height)"};
  /* width: 3cm; */
  /* max-width: 7vw; */

  &:last-of-type {
    /* margin-right: 0; */
    margin-right: ${({ position }) => position === "top" ? "0" : "initial"};
    margin-top: ${({ position }) => position === "left" ? "0" : "initial"};
    margin-bottom: ${({ position }) => position === "right" ? "0" : "initial"};
  }
`;

function Card({ card, position = "top" }: {
  card: CardType,
  position?: string
}) {
  const { back } = card;
  const color = ["red", "blue"][back];
  return (
    <Container position={position}>
      <img
        src={`./img/back-${color}.png`}
        style={{ width: "100%", height: "100%" }}
        draggable={false}
        alt=""
      />
    </Container>
  );
}

export default Card;