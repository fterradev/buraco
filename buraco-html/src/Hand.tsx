import React from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";

const rowGap = "5px";

const Container = styled.div`
  background-color: #258559;
  display: flex;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  padding: 5px 5px 0 5px;
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
      />
    })}
  </Container>;
}

export default Hand;