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

const leftCardWidth = (position: string) => {
  switch (position) {
    case "left":
      return "((-1) * var(--card-width))";
    case "right":
      return "(var(--card-height))";
    default:
      break;
  }
}

const leftCardMove = (position: string) => {
  switch (position) {
    case "left":
      return "(0.5 * var(--card-height))";
    case "right":
      return "((-0.5) * var(--card-height))";
    default:
      break;
  }
}

const rotate = (position: string) => {
  switch (position) {
    case "left":
      return "rotate(-90deg)";
    case "right":
      return "rotate(90deg)";
    default:
      break;
  }
}

const rotateOrigin = (position: string) => {
  switch (position) {
    case "left":
      return "right top";
    case "right":
      return "left top";
    default:
      break;
  }
}

const CssSlideIn = createGlobalStyle<CssSlideInProps>`
  @keyframes slidein1 {
    from {
      left: ${({initial}) => `calc(${initial.position.x}px + ${leftCardWidth(initial.position.position)})`};
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: ${({initial}) => rotate(initial.position.position)};
      transform-origin: ${({initial}) => rotateOrigin(initial.position.position)};
      margin: 0;
      animation-timing-function: ease-in;
      // z-index: 10;
    }

    25% {
      left: ${({initial}) => `calc(${initial.position.x}px + ${leftCardWidth(initial.position.position)} + ${leftCardMove(initial.position.position)})`};
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: ${({initial}) => rotate(initial.position.position)};
      transform-origin: ${({initial}) => rotateOrigin(initial.position.position)};
      margin: 0;
      animation-timing-function: linear;
      // z-index: 10;
    }
  
    99%, to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      margin: 0;
      animation-timing-function: ease-out;
      // z-index: 10;
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
    }

    25% {
      left: ${({initial}) => `calc(${initial.position.x}px + var(--card-height))`};
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: linear;
    }
  
    to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      margin: 0;
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
    }

    25% {
      left: ${({initial}) => initial.position.x}px;
      top: ${({initial}) => initial.position.y}px;
      position: absolute;
      transform: rotate(-90deg) translateX(-100%) translateY(50%);
      transform-origin: left top;
      margin: 0;
      animation-timing-function: linear;
    }
  
    to {
      left: ${({final}) => final.position.x}px;
      top: ${({final}) => final.position.y}px;
      position: absolute;
      margin: 0;
      animation-timing-function: ease-out;
    }
  }
  @keyframes flip {
    from, 60% {
      transform: rotateY(-180deg);
    }
  
    99%, to {
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
        setEnterPosition({x: x + window.scrollX, y: y + window.scrollY, position: "bottom"});
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
    rank === 1
      ? "A"
      : 2 <= rank && rank <= 9
      ? String(rank)
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
