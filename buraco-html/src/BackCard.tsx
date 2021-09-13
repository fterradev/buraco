import React from "react";
import styled from "styled-components";
import { Card as CardType } from "buraco/dist/deck";

interface Props {
};
const borderWidth = "1px";
const width = "2em";
const height = "2.5em";
const marginCalcContent = '-0.75 * var(--card-width)';
const marginCard = `calc(${marginCalcContent})`;
const minHeight = `calc(-1 * ${marginCalcContent})`;
// const widthSmall = `calc(100%/11 - (${marginRight} + 2*${borderWidth}))`;
// const marginCardSmall = `calc(-0.75 * (100%/11 - (${marginRight} + 2*${borderWidth})))`;
const Container = styled.div<Props>`
  background-color: beige;
  display: flex;
  flex-direction: column;
  font-family: card-characters;
  font-size: 1.5rem;
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 2px;
  /* width: ${width}; */
  width: var(--card-width);
  /* margin-right: calc(-0.75 * ${width}); */
  height: var(--card-height);
  /* width: 3cm; */
  /* max-width: 7vw; */
  backface-visibility: hidden;
`;

interface BackCardProps {
  card: CardType,
  upwards: boolean;
}

export function BackCard({
  card,
  upwards = false
}: BackCardProps) {
  const { back } = card;
  const color = ["red", "blue"][back];
  return (
    <Container
      style={{
        transform: upwards ? 'rotateY(180deg)' : undefined,
      }}
    >
      <img
        src={`./img/back-${color}.png`}
        style={{ width: "100%", height: "100%" }}
        draggable={false}
        alt=""
      />
    </Container>
  );
}

export default BackCard;