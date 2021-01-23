import React from "react";
import OtherPlayer from "./OtherPlayer";
import deck from "buraco/dist/deck";
import Mesa from "./Mesa";
import styled from "styled-components";
import Hand from "./Hand";
import { Player } from "buraco/dist/game";

const borderWidth = "1px";
const externalBorder = "5px";
const marginCards = "5px";

const Container = styled.div`
  --card-height: 3.75rem;
  --card-width: 3rem;
  @media (max-width: 10cm) {
    --card-width: calc((100vw - 2*${externalBorder})/11 - (${marginCards} + 2*${borderWidth}));
  }
  --card-height-with-border: calc(var(--card-height) + 2*1px);
  --negative-margin: calc(var(--card-height) * 0.4);
  --reduced-player-height: calc(var(--card-height-with-border) - var(--negative-margin));
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
    name: "Josué da Silva Medeiros"
  } as any;
  const otherPlayer2: Player = {
    hand: otherCards2 as any,
    id: 1,
    name: "Grande Mais Maior"
  } as any;
  const otherPlayer3: Player = {
    hand: otherCards3 as any,
    id: 2,
    name: "Maioral Ainda Mais"
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