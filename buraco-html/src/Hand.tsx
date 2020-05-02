import React from "react";
import { CardSet } from "buraco/dist/deck";
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
  padding: ${({externalBorder = defaultExternalBorder}) => `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
  margin-left: ${`-${marginCards}`};
`;
function Hand(options: {
  cards: CardSet
}) {
  const [{ isOver }, drop] = useDrop({
		accept: "Card",
		drop: () => console.log("dropped"),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	})
  return <Container ref={drop}>
    {options.cards.map(card => {
      return <Card
        key={card.id}
        card={card}
        rowGap={rowGap}
        externalBorder={defaultExternalBorder}
        marginCards={marginCards}
      />
    })}
    <DropHighlighter activate={isOver} />
  </Container>;
}

export default Hand;