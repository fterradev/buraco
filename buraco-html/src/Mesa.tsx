import React, { useState } from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import OtherPlayer from "./OtherPlayer";
import Sortable from "./Sortable";
import Player from "./interfaces/Player";

const rowGap = "5px";

const defaultMarginCards = "3px";

const Container = styled.div`
  background-color: #45a173;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  /* align-items: center; */
  /* margin-bottom: -${rowGap}; */
`;
const MesaWithSidePlayers = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const MesaItself = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  /* flex-grow: 1; */
  flex-wrap: wrap;
  padding: 10px;
`;

interface DiscardedCardsProps {
  readonly marginCards: string;
}
const DiscardedCards = styled.div<DiscardedCardsProps>`
  display: flex;
  /* flex: 1; */
  /* flex-grow: 1; */
  flex-wrap: wrap;
  margin-left: ${({ marginCards = defaultMarginCards }) => `-${marginCards}`};
`;
function Mesa(options: {
  deckLength: number;
  cards: CardSet;
  mortosLength: number;
  players: Player[];
}) {
  const marginCards = defaultMarginCards;
  const [orderedCards, setOrderedCards] = useState(options.cards);
  return (
    <Container>
      <OtherPlayer player={options.players[0]} />
      <MesaWithSidePlayers>
        {/* <C1>oi</C1> */}
        {/* <C1> */}
        <OtherPlayer player={options.players[1]} position="left" color="blue" />
        {/* </C1> */}
        <MesaItself>
          <Sortable
            tag={DiscardedCards}
            list={orderedCards}
            setList={setOrderedCards}
            group={{
              name: "mesa",
              put: true
            }}
          >
            {orderedCards.map((card, index) => {
              return (
                <Card
                  key={card.id}
                  index={index}
                  card={card}
                  rowGap={rowGap}
                  externalBorder="5px"
                  marginCards={marginCards}
                />
              );
            })}
          </Sortable>
        </MesaItself>
        <OtherPlayer
          player={options.players[2]}
          position="right"
          color="blue"
        />
        {/* <C1>oi</C1>
      <C2>xau</C2> */}
      </MesaWithSidePlayers>
    </Container>
  );
}

export default Mesa;
