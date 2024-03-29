import React, { useContext, useEffect, useRef, useState } from "react";
import { CardSet } from "buraco/dist/deck";
import styled, { createGlobalStyle } from "styled-components";
import Card from "./Card";
import OtherPlayer from "./OtherPlayer";
import Sortable from "./Sortable";
import Player from "./interfaces/Player";
import GameContext, { IMove } from "./context";
import Deck from "./Deck";

const rowGap = "5px";

const defaultMarginCardsPixel = 3;

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
  flex: 1;
  padding: 10px;
  // row-gap: 10px;
  justify-content: space-evenly;
`;

const DeckContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  /* flex-grow: 1; */
  flex-wrap: wrap;
`;

const DiscardedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
  /* flex-grow: 1; */
  flex-wrap: wrap;
`;

const GlobalStyleRemove = createGlobalStyle`
  @keyframes removeHeight {
    from, 75% {
        height: var(--card-width); // yes, height here refers to var card-width
    }
  
    to {
      height: calc(0.75 * var(--card-width)); // see marginCard
    }
  }
  @keyframes removeWidth {
    from, 75% {
        width: var(--card-width);
    }
  
    to {
      width: calc(0.75 * var(--card-width)); // see marginCard
    }
  }
`;

const CssFlip = createGlobalStyle`
  .flip {
    transform: rotateY(180deg);
  }
`;

interface DiscardedCardsProps {
  readonly marginCardsPixel: number;
}
const DiscardedCards = styled.div<DiscardedCardsProps>`
  display: flex;
  /* flex: 1; */
  /* flex-grow: 1; */
  flex-wrap: wrap;
  margin-left: ${({ marginCardsPixel = defaultMarginCardsPixel }) => `-${marginCardsPixel}px`};
`;

interface MesaComponentProps extends MesaProps {
  moves: Record<number, IMove>
}

export function MesaComponent(options: MesaComponentProps) {
  const marginCardsPixel = defaultMarginCardsPixel;
  console.log({length: options.mesaCards.length});
  if (options.mesaCards.some(card => card.id === 26)) {
    console.log("chegou na mesa");
  }
  // const [orderedCards, setOrderedCards] = useState(options.mesaCards);
  // useEffect(() => {
  //   setOrderedCards(options.mesaCards);
  // }, [options.mesaCards]);
  // if (orderedCards.some(card => card.id === 26)) {
  //   console.log("chegou na orderedCards");
  // }
  const { moves } = options;
  return (
    <>
      <GlobalStyleRemove />
      <CssFlip />
      <Container>
        <OtherPlayer player={options.partner} />
        <MesaWithSidePlayers>
          {/* <C1>oi</C1> */}
          {/* <C1> */}
          <OtherPlayer player={options.opponents[0]} position="left" color="blue" />
          {/* </C1> */}
          <MesaItself>
            <DeckContainer>
              <Deck cards={options.deck} />
            </DeckContainer>
            <DiscardedContainer>
              <Sortable
                tag={DiscardedCards}
                list={options.mesaCards}
                setList={options.setMesaCards}
                group={{
                  name: "mesa",
                  put: true
                }}
              >
                {options.mesaCards.map((card, index) => {
                  return (
                    <Card
                      key={card.id}
                      index={index}
                      card={card}
                      rowGap={rowGap}
                      externalBorder="5px"
                      marginCardsPixel={marginCardsPixel}
                      entering={moves[card.id]?.input.destination === "mesa"}
                      leaving={moves[card.id] !== undefined && moves[card.id].input.destination !== "mesa"}
                    />
                  );
                })}
              </Sortable>
            </DiscardedContainer>
          </MesaItself>
          <OtherPlayer
            player={options.opponents[1]}
            position="right"
            color="blue"
          />
          {/* <C1>oi</C1>
        <C2>xau</C2> */}
        </MesaWithSidePlayers>
      </Container>
    </>
  );
}

interface MesaProps {
  // deckLength: number;
  deck: CardSet,
  mesaCards: CardSet;
  setMesaCards: (mesaCards: CardSet) => void;
  mortosLength: number;
  opponents: [Player, Player];
  partner: Player;
};

function Mesa(options: MesaProps) {
  const {
    moves
  } = useContext(GameContext);
  console.log({length: options.mesaCards.length});
  return <MesaComponent {...options} moves={moves} />
}

export default Mesa;
