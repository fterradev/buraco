import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { Card as CardType } from "buraco/dist/deck";
import DropHighlighter from "./DropHighlighter";

const borderWidth = "1px";
interface ContainerProps {
  readonly rowGap: string;
  readonly externalBorder: string;
  readonly marginCards: string;
};
const Container = styled.div<ContainerProps>`
  background-color: beige;
  display: flex;
  flex-direction: column;
  font-family: card-characters;
  font-size: 1.5em;
  color: ${props => props.color || "black"};
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 3px;
  margin-left: ${({ marginCards }) => marginCards};
  margin-bottom: ${({ rowGap = "" }) => rowGap};
  width: 2em;
  height: fit-content;
  @media (max-width: 10cm) {  
    width: ${({ externalBorder = "5px", marginCards }) => `calc((100vw - 2*${externalBorder}})/11 - (${marginCards} + 2*${borderWidth}))`};
  }
  /* width: 3cm; */
  /* max-width: 7vw; */

  /* &:last-child {
    margin-left: 0;
  } */
`;

const DropContainer = styled.div`
  position: relative;
`;

function Card({
  card,
  rowGap,
  externalBorder,
  marginCards,
  index,
  onDropCard,
  onBeginDrag,
  onEndDrag,
  onEnteredHover,
  onExitedHover
}: {
  card: CardType,
  rowGap: string,
  externalBorder: string, // In fact this should be a context value. Should specially reflect the externalBorder in Hand's Container component.
  marginCards: string,
  index: number,
  onDropCard: (item: any, index: number) => void,
  onBeginDrag: () => void,
  onEndDrag: () => void,
  onEnteredHover: (item: any) => void,
  onExitedHover: () => void
}) {
  const { id, rank, suit } = card;
  const realRank = (1 <= rank) && (rank <= 9)
    ? String(rank)
    : rank === 0
      ? "A"
      : ["=", "J", "Q", "K"][rank - 10];
  const realSuit = ["[", "]", "{", "}"][suit];
  const color = suit % 2 === 0 ? "red" : "black";

  const [{ isDragging }, drag] = useDrag({
    item: { type: "Card", card, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: monitor => {
      onBeginDrag();
    },
    end: (dropResult) => {
      onEndDrag();
    }
  });

  const [wasOver, setWasOver] = useState(false);

  const [{ isOver, item }, drop] = useDrop({
    accept: "Card",
    canDrop: (item: any) => item.card.id !== id,
    hover: (item, monitor) => {
      if (!wasOver && monitor.canDrop()) {
        // console.log("aaa");
        // onEnteredHover(item);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    if (isOver !== wasOver) {
      if (isOver) {
        console.log("enter", index);
        if (item) {
          console.log("item", index);
          onEnteredHover(item);
        }
      } else {
        console.log("exit", index);
        onExitedHover();
      }
      setWasOver(isOver);
    }
  }, [isOver, item]);

  return <DropContainer ref={drop}>
    <Container
      color={color}
      rowGap={rowGap}
      externalBorder={externalBorder}
      marginCards={marginCards}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
    >
      <div>{realRank}</div>
      <div>{realSuit}</div>
    </Container>
    <DropHighlighter activate={isOver} />
  </DropContainer>;
}

export default Card;