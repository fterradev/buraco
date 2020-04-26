import React from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import { useDrop } from "react-dnd";
import DropHighlighter from "./DropHighlighter";

const rowGap = "5px";

interface ContainerProps {
  readonly externalBorder?: string;
};
const Container = styled.div<ContainerProps>`
  background-color: #258559;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  /* margin-bottom: -${rowGap}; */
  /* padding: 5px 5px 0 5px; */
  padding: ${({externalBorder = "5px"}) => `${externalBorder} ${externalBorder} 0 ${externalBorder}`};
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
        externalBorder="5px"
      />
    })}
    <DropHighlighter activate={isOver} />
  </Container>;
}

export default Hand;