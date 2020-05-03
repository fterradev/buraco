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

function Card({ card, rowGap, externalBorder, marginCards, index, onHover, onEndDrag, updateIsOver }: {
  card: CardType,
  rowGap: string,
  externalBorder: string, // In fact this should be a context value. Should specially reflect the externalBorder in Hand's Container component.
  marginCards: string,
  index: number,
  onHover: (item: any, index: number) => void,
  onEndDrag: (result?: boolean) => void,
  updateIsOver: (isOver: boolean) => void
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
    end: (result: boolean | undefined, monitor) => {
      console.log({result});
      console.log(monitor.getDropResult())
      if (result) {

      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [wasOver, setWasOver] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: "Card",
    canDrop: (item: any) => item.card.id !== id,
    // drop: (item) => {
    //   console.log("dropped");
    //   monitor.canDrop()
    // },
    hover: (item, monitor) => {
      // monitor.canDrop() && onDropCard(item, index);
      // if (monitor.canDrop()) {
      //   console.log("cccc")
      // }
      if (!wasOver && monitor.canDrop()) {
        console.log("aaa");
        onHover(item, index);
      }
    },
    drop: (item, monitor) => {
      return {success: monitor.canDrop()};
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (isOver !== wasOver) {
    setWasOver(isOver);
  }
  useEffect(() => {
    updateIsOver(isOver);
    return () => {
      updateIsOver(false);
    }
  }, [isOver]);
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