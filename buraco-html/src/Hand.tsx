import React, { useState } from "react";
import { CardSet, Card as CardType } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import { useDrop } from "react-dnd";
import DropHighlighter from "./DropHighlighter";

const rowGap = "5px";
const marginCards = "5px";

interface ContainerProps {
  readonly externalBorder?: string;
};
const defaultExternalBorder = "5px";
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  /* padding: 5px 5px 0 5px; */
  padding: ${({ externalBorder = defaultExternalBorder }) => `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
  margin-left: ${`-${marginCards}`};
`;
interface CardInfo {
  card: CardType;
  index: number;
}
function Hand(options: {
  cards: CardSet,
  dropActivated: boolean
}) {
  const { cards, dropActivated } = options;
  const [orderedCards, setOrderedCards] = useState([...cards]);
  const [withoutDraggingCard, setWithoutDraggingCard] = useState([...cards]);
  // const [originalOrderedCards, setOriginalOrderedCards] = useState([...cards]);
  const [draggingCardInfo, setDraggingCardInfo] = useState<CardInfo>();
  const [hoverIndex, setHoverIndex] = useState<number>();
  const [{ isOver }, drop] = useDrop({
    accept: "Card",
    canDrop: () => dropActivated,
    drop: () => console.log("dropped"),
    collect: monitor => ({
      isOver: !!(monitor.canDrop() && monitor.isOver()),
    }),
  })
  // console.log(orderedCards);
  return <Container ref={drop}>
    {orderedCards.map((card, index) => {
      return <Card
        key={index}
        card={card}
        rowGap={rowGap}
        externalBorder={defaultExternalBorder}
        marginCards={marginCards}
        index={index}
        onBeginDrag={() => {
          setDraggingCardInfo({ card: orderedCards[index], index });
          setWithoutDraggingCard([...orderedCards.slice(0, index), ...orderedCards.slice(index + 1)]);
          console.log([...orderedCards.slice(0, index), ...orderedCards.slice(index)]);
        }}
        onEndDrag={() => {
          
        }}
        onEnteredHover={(item: any) => {
          setHoverIndex(index);
          console.log(item.card);
          const result = [...withoutDraggingCard.slice(0, index), item.card, ...withoutDraggingCard.slice(index)];
          setOrderedCards(result);
          // console.log(result);
        }}
        onExitedHover={() => {
          if (hoverIndex === index) {
            setHoverIndex(undefined);
            setOrderedCards([...withoutDraggingCard]);
          }
        }}
        onDropCard={(item: any, index: any) => {
          const card = item.card;
          const sourceIndex = item.index;
          // setOrderedCards([...orderedCards.slice(0, index), card, ...orderedCards.slice(index, sourceIndex), ...orderedCards.slice(sourceIndex + 1)]);
          const withoutMovedCard = [...orderedCards.slice(0, sourceIndex), ...orderedCards.slice(sourceIndex + 1)];
          const result = [...withoutMovedCard.slice(0, index), card, ...withoutMovedCard.slice(index)];
          setOrderedCards(result);
        }}
      />
    })}
    <DropHighlighter activate={isOver} />
  </Container>;
}

export default Hand;