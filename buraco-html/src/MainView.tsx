import React, { useContext } from "react";
import OtherPlayer from "./OtherPlayer";
import deck from "buraco/dist/deck";
import Mesa from "./Mesa";
import styled from "styled-components";
import Hand from "./Hand";
import Player from "./interfaces/Player";
import GameContext from "./context";

const borderWidth = "1px";
const externalBorder = "5px";
const marginCards = "3px";

// (Hopefully) Fixes the width / border painting issue in Chrome, after the animation, which happens sometimes.
// Sometimes the card has no right border, and if we make Chrome repaint it, the border appears, but the element is 1 pixel less than it should be.
// Well, it is probably a rounding issue, because there is no real fractional pixel.
const hackyComplement = "0.2px";

const Container = styled.div`
  --card-height: 3.7rem;
  --card-width: 3rem;
  @media (max-width: 10cm) {
    // --card-width: calc((100vw - 2*${externalBorder})/11 - (${marginCards} + 2*${borderWidth}));
    // --card-width: calc((100vw - 10px)/11 - ${marginCards});
    --card-width: calc((100vw - 2*${externalBorder})/11 - ${marginCards} + ${hackyComplement});
  }
  --card-height-with-border: calc(var(--card-height) + 2*1px);
  --negative-margin: calc(var(--card-height) * 0.4);
  --reduced-player-height: calc(var(--card-height-with-border) - var(--negative-margin));
  --pile-offset: 1px;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* justify-content: space-between; */
`;
function MainView() {
  const {
    otherTeam: [
      opponent1,
      opponent2,
    ],
    partner,
    player: {
      hand: playerHand
    },
    mesaCards,
    setMesaCards,
    deck
  } = useContext(GameContext);
  console.log({length: mesaCards.length});
  return <Container>
    {/* <OtherPlayer player={otherPlayer} /> */}
    {/* <OtherPlayer />
    <OtherPlayer />
    <OtherPlayer /> */}
    <Mesa
      // deckLength={80}
      deck={deck}
      mesaCards={mesaCards}
      setMesaCards={setMesaCards}
      mortosLength={2}
      opponents={[opponent1, opponent2]}
      partner={partner}
    />
    <Hand
      cards={playerHand}
    />
  </Container>;
}

export default MainView;