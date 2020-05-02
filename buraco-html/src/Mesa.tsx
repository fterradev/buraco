import React from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import { Player } from "buraco/dist/game";
import OtherPlayer from "./OtherPlayer";

const rowGap = "5px";

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
};
const DiscardedCards = styled.div<DiscardedCardsProps>`
  display: flex;
  /* flex: 1; */
  /* flex-grow: 1; */
  flex-wrap: wrap;
  margin-left: ${({ marginCards }) => `-${marginCards}`};
`;
function Mesa(options: {
  deckLength: number,
  cards: CardSet,
  mortosLength: number,
  players: Player[]
}) {
  const marginCards = "5px";
  return <Container>
    <OtherPlayer player={options.players[0]} />
    <MesaWithSidePlayers>
      {/* <C1>oi</C1> */}
      {/* <C1> */}
      <OtherPlayer player={options.players[1]} position="left" color="blue" />
      {/* </C1> */}
      <MesaItself>
        <DiscardedCards marginCards={marginCards} >
          {options.cards.map((card, index) => {
            return <Card
              key={card.id}
              card={card}
              rowGap={rowGap}
              externalBorder="5px"
              marginCards={marginCards}
              index={index}
              onDropCard={() => {}}
            />
          })}
        </DiscardedCards>
      </MesaItself>
      <OtherPlayer player={options.players[2]} position="right" color="blue" />
      {/* <C1>oi</C1>
      <C2>xau</C2> */}
    </MesaWithSidePlayers>
  </Container>;
}

export default Mesa;