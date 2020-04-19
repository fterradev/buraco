import React from "react";
import styled from "styled-components";
import { Card as CardType } from "buraco/dist/deck";


const marginRight = "5px";
const borderWidth = "1px";
interface ContainerProps {
  readonly rowGap: string;
};
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  font-family: card-characters;
  font-size: 1.5em;
  color: ${props => props.color || "black"};
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 2px;
  margin-right: ${marginRight};
  margin-bottom: ${({rowGap = ""}) => rowGap};
  width: 2em;
  height: fit-content;
  @media (max-width: 10cm) {  
    width: calc((100% + ${marginRight})/11 - (${marginRight} + 2*${borderWidth}));
  }
  /* width: 3cm; */
  /* max-width: 7vw; */

  /* &:last-child {
    margin-right: 0;
  } */
`;
function Card({ card, rowGap }: {
  card: CardType,
  rowGap: string
}) {
  const { rank, suit } = card;
  const realRank = (1 <= rank) && (rank <= 9)
    ? String(rank)
    : rank === 0
      ? "A"
      : ["=", "J", "Q", "K"][rank - 10];
  const realSuit = ["[", "]", "{", "}"][suit];
  const color = suit % 2 === 0 ? "red" : "black";
  return <Container color={color} rowGap={rowGap}>
    <div>{realRank}</div>
    <div>{realSuit}</div>
  </Container>;
}

export default Card;