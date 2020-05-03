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
function Hand(options: {
  cards: CardSet,
  dropActivated: boolean
}) {
  const { cards, dropActivated } = options;
  const [orderedCards, setOrderedCards] = useState([...cards]);
  interface CardInfo {
    card: CardType;
    sourceIndex: number;
  }
  const [draggingCardInfo, setDraggingCardInfo] = useState<CardInfo>();
  const [withoutDraggingCard, setWithoutDraggingCard] = useState([...cards]);
  const [isOverCards, setIsOverCards] = useState<boolean[]>([]);
  // const [orderedCards, setOrderedCards] = useState({ cards: [...cards], withoutDragging: [...cards] });
  const [{ isOver }, drop] = useDrop({
    accept: "Card",
    canDrop: () => dropActivated,
    drop: () => console.log("dropped"),
    collect: monitor => ({
      isOver: !!(monitor.canDrop() && monitor.isOver()),
    }),
  })
  if (
    isOverCards.every(item => (item === false))
    && draggingCardInfo
    && orderedCards.length !== cards.length
  ) {
    const { card, sourceIndex } = draggingCardInfo;
    const result = [...withoutDraggingCard.slice(0, sourceIndex), ...withoutDraggingCard.slice(sourceIndex)];
    setOrderedCards(result);
    // setDraggingCardInfo(undefined);
  }
  return <Container ref={drop}>
    {orderedCards.map((card, index) => {
      return <Card
        key={card.id}
        card={card}
        rowGap={rowGap}
        externalBorder={defaultExternalBorder}
        marginCards={marginCards}
        index={index}
        onHover={(item: any, index: any) => {
          console.log("ooo");
          const card = item.card;
          const sourceIndex = item.index;
          // setOrderedCards([...orderedCards.slice(0, index), card, ...orderedCards.slice(index, sourceIndex), ...orderedCards.slice(sourceIndex + 1)]);
          let localWithoutDraggingCard = withoutDraggingCard;
          if (withoutDraggingCard.length === orderedCards.length) {
            localWithoutDraggingCard = [...orderedCards.slice(0, sourceIndex), ...orderedCards.slice(sourceIndex + 1)];
            setDraggingCardInfo({ card: orderedCards[sourceIndex], sourceIndex });
            setWithoutDraggingCard(localWithoutDraggingCard);
            console.log({ localWithoutDraggingCard })
          }
          if (orderedCards.length !== localWithoutDraggingCard.length) {
            console.log({ w2: localWithoutDraggingCard });
            const result = [...localWithoutDraggingCard.slice(0, index), card, ...localWithoutDraggingCard.slice(index)];
            setOrderedCards(result);
          }
        }}
        onEndDrag={() => {
          setWithoutDraggingCard(orderedCards);
        }}
        updateIsOver={(isOver) => {
          setIsOverCards([...isOverCards.slice(0, index), isOver, ...isOverCards.slice(index + 1)]);
        }}
      />
    })}
    <DropHighlighter activate={isOver} />
  </Container>;
}

export default Hand;