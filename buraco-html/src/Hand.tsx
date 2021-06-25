import React, { useState } from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import Sortable from "./Sortable";

const rowGap = "5px";
const marginCardsPixel = 3;

interface ContainerProps {
  readonly externalBorder?: string;
}
const defaultExternalBorder = "5px";
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: flex;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  /* padding: 5px 5px 0 5px; */
  padding: ${({ externalBorder = defaultExternalBorder }) =>
    `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
  margin-left: ${`-${marginCardsPixel}px`};
`;
function Hand(options: { cards: CardSet }) {
  // TODO: useEffect to updateState from props, or update state in the context - see mesaCards.
  const [orderedCards, setOrderedCards] = useState(options.cards);
  return (
    <Sortable
      tag={Container}
      list={orderedCards}
      setList={setOrderedCards}
    >
      {orderedCards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
            card={card}
            rowGap={rowGap}
            externalBorder={defaultExternalBorder}
            marginCardsPixel={marginCardsPixel}
          />
        );
      })}
    </Sortable>
  );
}

export default Hand;
