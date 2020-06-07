import React from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const rowGap = "5px";
const marginCards = "5px";

interface ContainerProps {
  readonly externalBorder?: string;
};
const defaultExternalBorder = "5px";
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: flex;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  /* padding: 5px 5px 0 5px; */
  padding: ${({ externalBorder = defaultExternalBorder }) => `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
  margin-left: ${`-${marginCards}`};
`;
function Hand(options: {
  cards: CardSet
}) {
  return (
    <Droppable droppableId="hand" direction="horizontal">
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {options.cards.map((card, index) => {
            return <Card
              key={card.id}
              index={index}
              card={card}
              rowGap={rowGap}
              externalBorder={defaultExternalBorder}
              marginCards={marginCards}
            />
          })}
        </Container>
      )}
    </Droppable>
  );
}

export default Hand;