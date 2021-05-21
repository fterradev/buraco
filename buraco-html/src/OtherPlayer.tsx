import React from "react";
import styled from "styled-components";
import Player from "./interfaces/Player";
import OtherPlayerCard from "./OtherPlayerCard";

interface Props {
  readonly position: string;
  readonly bgColor?: string;
};

const Container = styled.div<Props>`
  position: relative;
  display: flex;
  /* flex: 1; */
  flex-basis: 0;
  /* flex-direction: row; */
  flex-direction: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "column" : "row"};
  /* transform: rotate(${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "-90deg" : "0"}); */
  justify-content: center;
  /* background-color: ${({ bgColor }) => bgColor}; */
  margin-top: ${({ position }) => position === "top" ? "calc(-1 * var(--negative-margin))" : "initial"};
  margin-left: ${({ position }) => position === "left" ? "calc(-1 * var(--negative-margin))" : "initial"};
  margin-right: ${({ position }) => position === "right" ? "calc(-1 * var(--negative-margin))" : "initial"};
  // height: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "initial" : "var(--reduced-player-height)"};
  // bottom: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "initial" : "var(--negative-margin)"};
  // width: ${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "var(--reduced-player-height)" : "initial"};
  // right: ${({ position }) => position === "left" ? "var(--negative-margin)" : "initial"};
  // left: ${({ position }) => position === "right" ? "var(--negative-margin)" : "initial"};
`;

const CardsContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  flex-direction: ${({ position }) => ["column-reverse", "row", "column"][["left", "top", "right"].indexOf(position)]};
  /* padding: 5px; */
  /* margin-${({ position }) => position}: -1.5rem; */
`;

const Title = styled.span<Props>`
  position: absolute;
  background-color: #f5f5dc80;
  font-weight: bold;
  align-self: ${({ position }) => ["flex-end", "flex-end", "flex-start"][["left", "top", "right"].indexOf(position)]};
  transform: rotate(
    ${({ position }) => ["-90deg", "0", "90deg"][["left", "top", "right"].indexOf(position)]}
  ) translatex(calc(
    ${({ position }) => ["1", "0", "-1"][["left", "top", "right"].indexOf(position)]}*(50% + 0.5em)
  ));
  transform-origin: bottom ${({ position }) => ["right", "", "left"][["left", "top", "right"].indexOf(position)]};
  white-space: nowrap;
  /* justify-self: center; */
`;

function OtherPlayer({ player, position = "top", color = "red" }: { player: Player, position?: string, color?: string }) {
  return <Container position={position} bgColor={color}>
    <div>
      <CardsContainer position={position}>
        {player.hand.map(card => {
          return <OtherPlayerCard
            key={card.id}
            card={card}
            position={position}
          />
        })}
        <Title position={position}>{player.name}</Title>
      </CardsContainer>
    </div>
  </Container>;
}

// const Container = styled.div`
//   background-color: #258559;
//   display: flex;
//   justify-content: center;
//   padding: 5px;
//   position: absolute;
// `;

// const Title = styled.span`
//   /* position: absolute; */
//   background-color: #f5f5dc80;
//   font-weight: bold;
//   /* align-self: flex-end; */
// `;

// function OtherPlayer({ player }: { player: Player }) {
//   return <div>
//     <Title>{player.name}</Title>
//     <Container>
//       {player.hand.map(card => {
//         return <OtherPlayerCard
//           key={card.id}
//           card={card}
//         />
//       })}
//     </Container>
//   </div>;
// }

export default OtherPlayer;