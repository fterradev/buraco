import React, { useContext, useEffect, useRef, useState } from "react";
import { CardSet } from "buraco/dist/deck";
import styled from "styled-components";
import Card from "./Card";
import OtherPlayer from "./OtherPlayer";
import Sortable from "./Sortable";
import Player from "./interfaces/Player";
import GameContext, { IMove } from "./context";

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
  justify-content: center;
  flex: 1;
  /* flex-grow: 1; */
  flex-wrap: wrap;
  padding: 10px;
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
  console.log({length: options.cards.length});
  if (options.cards.some(card => card.id === 26)) {
    console.log("chegou na mesa");
  }
  const [orderedCards, setOrderedCards] = useState(options.cards);
  useEffect(() => {
    setOrderedCards(options.cards);
  }, [options.cards]);
  if (orderedCards.some(card => card.id === 26)) {
    console.log("chegou na orderedCards");
  }
  const { moves } = options;
  return (
    <Container>
      <OtherPlayer player={options.partner} />
      <MesaWithSidePlayers>
        {/* <C1>oi</C1> */}
        {/* <C1> */}
        <OtherPlayer player={options.opponents[0]} position="left" color="blue" />
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
                  marginCardsPixel={marginCardsPixel}
                  entering={moves[card.id]?.input.destination === "mesa"}
                  leaving={moves[card.id] !== undefined && moves[card.id].input.destination !== "mesa"}
                />
              );
            })}
          </Sortable>
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
  );
}

interface MesaProps {
  deckLength: number;
  cards: CardSet;
  mortosLength: number;
  opponents: [Player, Player];
  partner: Player;
};

function Mesa(options: MesaProps) {
  const {
    moves
  } = useContext(GameContext);
  console.log({length: options.cards.length});
  return <MesaComponent {...options} moves={moves} />
}

export default Mesa;
