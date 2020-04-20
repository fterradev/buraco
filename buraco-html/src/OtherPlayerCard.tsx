import React from "react";
import styled from "styled-components";
import { Card as CardType } from "buraco/dist/deck";

interface Props {
  readonly position: string;
};
const marginRight = "5px";
const borderWidth = "1px";
const width = "1em";
const height = "1.5em";
const marginCard = `calc(-0.75 * ${width})`;
// const widthSmall = `calc(100%/11 - (${marginRight} + 2*${borderWidth}))`;
// const marginCardSmall = `calc(-0.75 * (100%/11 - (${marginRight} + 2*${borderWidth})))`;
const Container = styled.div<Props>`
  background-color: beige;
  display: flex;
  /* flex-direction: column; */
  flex-direction: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "row" : "column"};
  /* transform: rotate(${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "-90deg" : "0"}); */
  font-family: card-characters;
  font-size: 1.5em;
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 2px;
  /* width: ${width}; */
  width: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? height : width};
  /* margin-right: calc(-0.75 * ${width}); */
  margin-right: ${({ position }) => position === "top" ? marginCard : "initial"};
  margin-top: ${({ position }) => position === "left" ? marginCard : "initial"};
  margin-bottom: ${({ position }) => position === "right" ? marginCard : "initial"};
  height: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? width : height};
  /* width: 3cm; */
  /* max-width: 7vw; */

  &:last-of-type {
    /* margin-right: 0; */
    margin-right: ${({ position }) => position === "top" ? "0" : "initial"};
    margin-top: ${({ position }) => position === "left" ? "0" : "initial"};
    margin-bottom: ${({ position }) => position === "right" ? "0" : "initial"};
  }
`;
// @media (max-width: 10cm) {  
//   /* width: calc(100%/11 - (${marginRight} + 2*${borderWidth})); */
//   height: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? widthSmall : "initial"};
//   width: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "initial" : widthSmall};
//   /* height: 38px;
//   width: 26px; */
//   /* margin-right: calc(-0.75 * (100%/11 - (${marginRight} + 2*${borderWidth}))); */
//   margin-right: ${({ position }) => position === "top" ? marginCardSmall : "initial"};
//   margin-top: ${({ position }) => position === "left" ? marginCardSmall : "initial"};
//   margin-bottom: ${({ position }) => position === "right" ? marginCardSmall : "initial"};
// }

const Rotate = styled.div<Props>`
  transform: rotate(${({ position }) => ["-90deg", "0", "90deg"][["left", "top", "right"].indexOf(position)]});
`;

function Card({ card, position = "top" }: {
  card: CardType,
  position?: string
}) {
  const { back } = card;
  const color = ["red", "blue"][back];
  return (
    <Container position={position}>
      <img src={`./img/back-${color}.png`} style={{ width: "100%", height: "100%" }} />
    </Container>
  );
}

export default Card;