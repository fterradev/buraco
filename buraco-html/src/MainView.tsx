import React from "react";
import OtherPlayer from "./OtherPlayer";
import deck from "buraco/dist/deck";
import Mesa from "./Mesa";
import styled from "styled-components";
import Hand from "./Hand";
import { Player } from "buraco/dist/game";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* justify-content: space-between; */
`;
function MainView() {
  const cards = deck.slice(0, 12);
  const handCards = deck.slice(13, 13+11);
  const otherCards = deck.slice(26, 26+11);
  const otherCards2 = deck.slice(39, 39+11);
  const otherCards3 = deck.slice(52, 52+11);
  const otherPlayer: Player = {
    hand: otherCards as any,
    id: 0,
    name: "José"
  } as any;
  const otherPlayer2: Player = {
    hand: otherCards2 as any,
    id: 1,
    name: "Rafael"
  } as any;
  const otherPlayer3: Player = {
    hand: otherCards3 as any,
    id: 2,
    name: "André"
  } as any;
  // console.log({JSON.stringify(options.cards)});
  return <Container>
    {/* <OtherPlayer player={otherPlayer} /> */}
    {/* <OtherPlayer />
    <OtherPlayer />
    <OtherPlayer /> */}
    <Mesa
      deckLength={80}
      cards={cards}
      mortosLength={2}
      players={[otherPlayer, otherPlayer2, otherPlayer3]}
    />
    <Hand
      cards={handCards}
    />
  </Container>;
}

export default MainView;