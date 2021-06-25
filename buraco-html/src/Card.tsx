import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Card as CardType } from "buraco/dist/deck";
import GameContext, { IMove, IPosition } from "./context";
import { Transition } from "react-transition-group";

const borderWidth = "1px";
interface ContainerProps {
  readonly rowGap: string;
  readonly externalBorder: string;
  readonly marginCards: string;
  readonly invisible: boolean;
}
const Container = styled.div<ContainerProps>`
  visibility: ${({ invisible }) => invisible ? 'hidden' : 'unset'};
  background-color: beige;
  display: flex;
  flex-direction: column;
  font-family: card-characters;
  font-size: 1.5rem;
  color: ${(props) => props.color || "black"};
  align-items: center;
  border-width: ${borderWidth};
  border-style: solid;
  border-color: black;
  border-radius: 3px;
  margin-left: ${({ marginCards }) => marginCards};
  margin-bottom: ${({ rowGap = "" }) => rowGap};
  width: var(--card-width);
  height: var(--card-height);
  /* width: 3cm; */
  /* max-width: 7vw; */

  /* &:last-child {
    margin-left: 0;
  } */
`;

interface GlobalStyleProps {
  initial: IPosition,
  final: IPosition
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @keyframes slidein {
    from {
        left: ${({initial}) => initial.x}px;
        top: ${({initial}) => initial.y}px;
        position: absolute;
    }
  
    to {
      left: ${({final}) => final.x}px;
      top: ${({final}) => final.y}px;
      position: absolute;
    }
  }
`

interface CardComponentProps extends CardProps {
  move?: IMove,
};

export function CardComponent({
  card,
  rowGap,
  externalBorder,
  marginCardsPixel,
  index,
  entering = false,
  leaving = false,
  move
}: CardComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enterPosition, setEnterPosition] = useState<IPosition>();
  if (card.id === 26) {
    console.log("card chegou");
  }
  useEffect(() => {
    console.log("card effect");
    if (ref.current && (leaving || entering) && move) {
      const { x, y } = ref.current.getBoundingClientRect();
      if (leaving) {
        move.setPosition({x: x + window.scrollX, y: y + window.scrollY});
      } else {
        console.log("setEnterPosition");
        setEnterPosition({x: x + window.scrollX - marginCardsPixel, y: y + window.scrollY});
      }
    }
  }, [ref.current !== undefined, leaving, entering, move !== undefined]);
  const transitionStyles: Record<string, React.CSSProperties> = {
    entering: {
        animationDuration: "2s",
        animationName: "slidein"
      },
    // entered: {
    //     backgroundColor: "red"
    // }
  };
  const { rank, suit } = card;
  const realRank =
    1 <= rank && rank <= 9
      ? String(rank)
      : rank === 0
      ? "A"
      : ["=", "J", "Q", "K"][rank - 10];
  const realSuit = ["[", "]", "{", "}"][suit];
  const color = suit % 2 === 0 ? "red" : "black";
  if (move?.position && enterPosition) {
    console.log({initial: move?.position, final: enterPosition});
  }
  return (
    <>
      {move?.position && enterPosition && <GlobalStyle
          initial={move?.position}
          final={enterPosition}
      />}
      <Transition
        appear
        in={entering}
        nodeRef={ref}
        addEndListener={(done) => {
          // use the css transitionend event to mark the finish of a transition
          ref.current?.addEventListener('animationend', () => {
              done();
          }, false);
        }}
        onExited={() => {
            console.log("exited")
        }}
      >{state => (
        <Container
          ref={ref}
          color={color}
          rowGap={rowGap}
          externalBorder={externalBorder}
          marginCards={`${marginCardsPixel}px`}
          invisible={leaving}
          style={{
            ...transitionStyles[state]
          }}
        >
          <div>{realRank}</div>
          <div>{realSuit}</div>
        </Container>
      )}
      </Transition>
    </>
  );
}

interface CardProps {
  card: CardType;
  rowGap: string;
  externalBorder: string; // In fact this should be a context value. Should specially reflect the externalBorder in Hand's Container component.
  marginCardsPixel: number;
  index: number;
  entering?: boolean;
  leaving?: boolean;
};

function Card(options: CardProps) {
  const {
    moves
  } = useContext(GameContext);
  return <CardComponent {...options} move={moves[options.card.id]} />
}

export default Card;
