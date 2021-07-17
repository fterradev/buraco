import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card as CardType } from "buraco/dist/deck";
import GameContext, { IMove, IPosition } from "./context";
import { Transition } from "react-transition-group";

interface Props {
  readonly position: string;
  readonly invisible: boolean;
};
const borderWidth = "1px";
const width = "2em";
const height = "2.5em";
const marginCalcContent = '-0.75 * var(--card-width)';
const marginCard = `calc(${marginCalcContent})`;
const minHeight = `calc(-1 * ${marginCalcContent})`;
// const widthSmall = `calc(100%/11 - (${marginRight} + 2*${borderWidth}))`;
// const marginCardSmall = `calc(-0.75 * (100%/11 - (${marginRight} + 2*${borderWidth})))`;
const Container = styled.div<Props>`
  visibility: ${({ invisible }) => invisible ? 'hidden' : 'unset'};
  background-color: beige;
  display: flex;
  /* flex-direction: column; */
  flex-direction: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "row" : "column"};
  /* transform: rotate(${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "-90deg" : "0"}); */
  font-family: card-characters;
  font-size: 1.5rem;
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 2px;
  /* width: ${width}; */
  width: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "var(--card-height)" : "var(--card-width)"};
  /* margin-right: calc(-0.75 * ${width}); */
  margin-right: ${({ position }) => position === "top" ? marginCard : "initial"};
  margin-top: ${({ position }) => position === "left" ? marginCard : "initial"};
  margin-bottom: ${({ position }) => position === "right" ? marginCard : "initial"};
  height: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "var(--card-width)" : "var(--card-height)"};
  /* width: 3cm; */
  /* max-width: 7vw; */

  &:last-of-type {
    /* margin-right: 0; */
    margin-right: ${({ position }) => position === "top" ? "0" : "initial"};
    margin-top: ${({ position }) => position === "left" ? "0" : "initial"};
    margin-bottom: ${({ position }) => position === "right" ? "0" : "initial"};
  }
`;

interface OtherPlayerCardComponentProps extends OtherPlayerCardProps {
  move?: IMove,
}

export function OtherPlayerCardComponent({
  card,
  position = "top",
  leaving,
  move,
}: OtherPlayerCardComponentProps) {
  const { back } = card;
  const color = ["red", "blue"][back];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("otherplayercard effect");
    if (ref.current && leaving && move) {
      console.log({ id: card.id });
      console.log(move);
      const { x, y } = ref.current.getBoundingClientRect();
      move.setPosition({ x: x + window.scrollX, y: y + window.scrollY });
    }
  }, [ref.current, leaving, move !== undefined]);
  const transitionStyles: Record<string, React.CSSProperties> = {
    exiting: {
      animationDuration: "1.25s",
      animationName: "remove"
    },
  };
  return (
    <Transition
      in={!leaving}
      nodeRef={ref}
      addEndListener={(done) => {
        // use the css transitionend event to mark the finish of a transition
        ref.current?.addEventListener('animationend', () => {
          done();
        }, false);
      }}
    >{state => (
      <Container
        position={position}
        ref={ref}
        invisible={leaving}
        style={{
          ...transitionStyles[state]
        }}
      >
        <img
          src={`./img/back-${color}.png`}
          style={{ width: "100%", height: "100%" }}
          draggable={false}
          alt=""
        />
      </Container>
    )}
    </Transition>
  );
}

interface OtherPlayerCardProps {
  card: CardType,
  position?: string
  leaving: boolean
  entering: boolean
}

function OtherPlayerCard(options: OtherPlayerCardProps) {
  const {
    moves
  } = useContext(GameContext);
  return <OtherPlayerCardComponent
    {...options}
    move={moves[options.card.id]}
  />
}

export default OtherPlayerCard;