import React, { PropsWithoutRef, useContext, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Card as CardType } from "buraco/dist/deck";
import GameContext, { IMove, IPosition } from "./context";
import { Transition } from "react-transition-group";
import { forceRedraw, isFaceDown } from "./utils";
import BackCard from "./BackCard";
import { CARD_MOVE_DURATION } from "./constants";

const borderWidth = "1px";
interface ContainerProps {
  readonly invisible: boolean;
  readonly externalBorder: string;
  readonly rowGap: string;
  readonly marginCards: string;
}
const Container = styled.div<ContainerProps>`
  visibility: ${({ invisible }) => invisible ? 'hidden' : 'unset'};
  margin-left: ${({ marginCards }) => marginCards};
  margin-bottom: ${({ rowGap = "" }) => rowGap};
  width: var(--card-width);
  height: var(--card-height);
  perspective: 200px;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

interface FrontProps {
}

const Front = styled.div<FrontProps>`
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
/* width: 3cm; */
/* max-width: 7vw; */

/* &:last-child {
  margin-left: 0;
} */
backface-visibility: hidden;
`;

interface CssSlideInProps {
  initial: {
    position: IPosition,
    faceDown: boolean,
  },
  final: {
    position: IPosition,
  }
}

const CssSlideIn = createGlobalStyle<CssSlideInProps>`
  @keyframes slidein1 {
    from {
      left: ${({initial}) => `calc(${initial.position.x}px - var(--card-width))`};
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg);
      transform-origin: right top;
      margin: 0;
      animation-timing-function: ease-in;
      border: 2px solid red;
    }

    25% {
      left: ${({initial}) => initial.position.x}px;
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg);
      transform-origin: right top;
      margin: 0;
      animation-timing-function: linear;
      border: none;
    }
  
    to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      animation-timing-function: ease-out;
    }
  }
  @keyframes slidein2 {
    from {
      left: ${({initial}) => initial.position.x}px;
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: ease-in;
      border: 2px solid red;
    }

    25% {
      left: ${({initial}) => `calc(${initial.position.x}px + var(--card-height))`};
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: linear;
      border: none;
    }
  
    to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      animation-timing-function: ease-out;
    }
  }
  @keyframes slidein3 {
    from {
      left: ${({initial}) => initial.position.x}px;
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: ease-in;
      border: 2px solid red;
    }

    25% {
      left: ${({initial}) => initial.position.x}px;
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%) translateY(50%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: linear;
      border: none;
    }
  
    to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      animation-timing-function: ease-out;
    }
  }
  @keyframes flip {
    from, 50% {
      transform: rotateY(-180deg);
    }
  
    to {
      transform: rotateY(0);
    }
  }
`;

interface CardComponentProps extends CardProps {
  move?: IMove,
};

export const CardComponent = ({
  card,
  rowGap,
  externalBorder,
  marginCardsPixel,
  index,
  entering = false,
  leaving = false,
  move,
  filterOut = false,
}: CardComponentProps) => {
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
        move.setPosition({x: x + window.scrollX, y: y + window.scrollY, position: "bottom"});
      } else {
        console.log("setEnterPosition");
        setEnterPosition({x: x + window.scrollX - marginCardsPixel, y: y + window.scrollY, position: "bottom"});
      }
    }
  }, [ref.current !== undefined, leaving, entering, move !== undefined]);
  const commonAnimation: React.CSSProperties = {
    animationDuration: CARD_MOVE_DURATION,
  };
  const containerTransitions: Record<string, React.CSSProperties> = {
    entering: {
        ...commonAnimation,
        animationName: "slidein1"
      },
    // entered: {
    //     backgroundColor: "red"
    // }
  };
  const innerContainerTransitions: Record<string, React.CSSProperties> = {
    entering: {
        ...commonAnimation,
        animationName: "flip"
      },
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
      {move?.position && enterPosition && <CssSlideIn
          initial={{
            position: move.position,
            faceDown: isFaceDown(move.input.source)
          }}
          final={{
            position: enterPosition
          }}
      />}
      <Transition
        appear
        in={entering}
        nodeRef={ref}
        addEndListener={(done) => {
          // use the css transitionend event to mark the finish of a transition
          ref.current?.addEventListener('animationend', () => {
              done();
              // const element = (ref.current?.children[0] as HTMLElement);
              // forceRedraw(element);
          }, false);
        }}
        onEntered={() => {
          console.log("entered");
          move?.removeLeftCard();
        }}
      >{state => (
        <Container
          className={filterOut ? "filtered" : undefined}
          ref={ref}
          rowGap={rowGap}
          externalBorder={externalBorder}
          marginCards={`${marginCardsPixel}px`}
          invisible={leaving}
          style={{
            ...containerTransitions[state]
          }}
        >
          <InnerContainer
            style={{
              ...innerContainerTransitions[state]
            }}
          >
            <Front
              color={color}
            >
              <div>{realRank}</div>
              <div>{realSuit}</div>
            </Front>
            <BackCard
              card={card}
              upwards
            />
          </InnerContainer>
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
  filterOut?: boolean;
};

function Card(options: CardProps) {
  const {
    moves
  } = useContext(GameContext);
  return <CardComponent {...options} move={moves[options.card.id]} />
}

export default Card;
