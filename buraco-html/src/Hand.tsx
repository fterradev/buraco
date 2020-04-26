import React from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";

const rowGap = "5px";

interface ContainerProps {
  readonly externalBorder?: string;
};
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: flex;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  /* padding: 5px 5px 0 5px; */
  padding: ${({externalBorder = "5px"}) => `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
`;
function Hand(options: {
  cards: CardSet
}) {
  return <Container>
    {options.cards.map(card => {
      return <Card
        key={card.id}
        card={card}
        rowGap={rowGap}
        externalBorder="5px"
      />
    })}
  </Container>;
}

export default Hand;