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

const Container = styled.div`
  --card-height: 3.6rem;
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
  const {
    otherTeam: {
      "0": opponent1,
      "1": opponent2,
    },
    partner,
    player: {
      hand: playerHand
    },
    mesaCards
  } = useContext(GameContext);
  // console.log({JSON.stringify(options.cards)});
  return <Container>
    {/* <OtherPlayer player={otherPlayer} /> */}
    {/* <OtherPlayer />
    <OtherPlayer />
    <OtherPlayer /> */}
    <Mesa
      deckLength={80}
      cards={mesaCards}
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