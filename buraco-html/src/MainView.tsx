import React from "react";
import OtherPlayer from "./OtherPlayer";
import deck from "buraco/dist/deck";
import Mesa from "./Mesa";
import styled from "styled-components";
import Hand from "./Hand";
import { Player } from "buraco/dist/game";
import SeatSelectorUpDown from "./SeatSelectorUpDown";

const startingKeyframe = `{
  transform: rotate(180deg);
  flex: 0;
  height: 100vmin;
  width: 100vmin;
}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* justify-content: space-between; */
  height: 100vh;
  width: 100vw;
  animation: rotate 5s;

  @keyframes rotate {
    0% ${startingKeyframe}
    25% ${startingKeyframe}
  }
`;
function MainView() {
  const cards = deck.slice(0, 12);
  const handCards = deck.slice(13, 13 + 11);
  const otherCards = deck.slice(26, 26 + 11);
  const otherCards2 = deck.slice(39, 39 + 11);
  const otherCards3 = deck.slice(52, 52 + 11);
  const otherPlayer: Player = {
    hand: otherCards as any,
    id: 0,
    name: "Rafael"
  } as any;
  const otherPlayer2: Player = {
    hand: otherCards2 as any,
    id: 1,
    name: "Rafael"
  } as any;
  const otherPlayer3: Player = {
    hand: otherCards3 as any,
    id: 2,
    name: "Rafael"
  } as any;
  // console.log({JSON.stringify(options.cards)});
  return <Container>
    {/* <OtherPlayer player={otherPlayer} /> */}
    {/* <OtherPlayer />
    <OtherPlayer />
    <OtherPlayer /> */}
    <Mesa
      deckLength={80}
      cards={[]}
      mortosLength={2}
      players={[otherPlayer, otherPlayer2, otherPlayer3]}
    />
    <SeatSelectorUpDown>
      <Hand
        cards={[]}
      />
    </SeatSelectorUpDown>
  </Container>;
}

export default MainView;