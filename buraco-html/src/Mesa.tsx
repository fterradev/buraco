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
  padding: 5px;
`;
const C = styled.div`
  /* flex: 1; */
  display: flex;
`;
const C1 = styled(C)`
  background-color: red;
  /* flex-direction: column; */
  /* position: relative; */
`;
const C2 = styled(C)`
flex: 1;
  background-color: blue;
`;
const DiscardedCards = styled.div`
display: flex;
/* flex: 1; */
/* flex-grow: 1; */
flex-wrap: wrap;
`;
function Mesa(options: {
  deckLength: number,
  cards: CardSet,
  mortosLength: number,
  players: Player[]
}) {
  return <Container>
    <OtherPlayer player={options.players[0]} />
    <MesaWithSidePlayers>
      {/* <C1>oi</C1> */}
      {/* <C1> */}
      <OtherPlayer player={options.players[1]} position="left" color="blue" />
      {/* </C1> */}
      <MesaItself>
        <DiscardedCards>
          {options.cards.map(card => {
            return <Card
              key={card.id}
              card={card}
              rowGap={rowGap}
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