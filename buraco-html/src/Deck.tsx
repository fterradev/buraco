import React, { useState } from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import Sortable from "./Sortable";

const rowGap = "5px";
const marginCardsPixel = -0.25;

const handMarginCardsPixel = 3;

interface ContainerProps {
  readonly externalBorder?: string;
}
const defaultExternalBorder = "5px";
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: block;
  position: absolute;
  flex-wrap: wrap;
  padding: ${({ externalBorder = defaultExternalBorder }) =>
    `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
  ${Array(40).fill(0).map((_, index) => {
    return `& > div:nth-child(${index+1}) {
      position: absolute;
      margin-left: ${marginCardsPixel * index}px;
      margin-top: ${marginCardsPixel * index}px;
      box-shadow: 0 1px 2px rgb(245 245 220 / 25%);
    }`;
  })}
  height: var(--card-height);
  & > div {
    position: absolute;
    box-shadow: 0 1px 2px rgb(245 245 220 / 25%);
  }
`;
function Hand(options: { cards: CardSet }) {
  // TODO: useEffect to updateState from props, or update state in the context - see mesaCards.
  const topCard = options.cards.slice(-1);
  const otherCardsDeck = options.cards.slice(0, -1);
  const [orderedCards, setOrderedCards] = useState(options.cards);
  const topIndex = orderedCards.length - 1;
  return (
    <Sortable
      tag={Container}
      list={orderedCards}
      setList={setOrderedCards}
      filter=".filtered"
      group={{
        name: "deck",
        put: false,
      }}
      sort={false}
    >
      {orderedCards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
            card={card}
            rowGap={rowGap}
            externalBorder={defaultExternalBorder}
            marginCardsPixel={handMarginCardsPixel}
            filterOut={index < topIndex}
            // isPile
          />
        );
      })}
    </Sortable>
  );
}

export default Hand;
