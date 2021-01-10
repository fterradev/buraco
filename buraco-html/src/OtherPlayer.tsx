import React from "react";
import styled from "styled-components";
import { Player } from "buraco/dist/game";
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
  flex-direction: ${({ position }) => ["column-reverse", "row", "column"][["left", "top", "right"].indexOf(position)]};
  /* transform: rotate(${({ position }) => ["left", "right"].indexOf(position) !== -1 ? "-90deg" : "0"}); */
  justify-content: center;
  align-items: flex-end;
  /* background-color: ${({ bgColor }) => bgColor}; */
`;

const CardsContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  flex-direction: ${({ position }) => ["column-reverse", "row", "column"][["left", "top", "right"].indexOf(position)]};
  /* padding: 5px; */
  /* margin-${({ position }) => position}: -1.5em; */
`;

const Title = styled.span<Props>`
  position: absolute;
  background-color: #f5f5dc80;
  font-weight: bold;
  align-self: ${({ position }) => (position === "left") ? "flex-start" : "flex-end"};
  transform: rotate(${({ position }) => ["-90deg", "0", "90deg"][["left", "top", "right"].indexOf(position)]});
  margin-bottom: ${({ position }) => (position === "top") ? "3px" : "0"}; // empirical adjustment 
  /* justify-self: center; */
`;

function OtherPlayer({ player, position = "top", color = "red" }: { player: Player, position?: string, color?: string }) {
  return <Container position={position} bgColor={color}>
    <CardsContainer position={position}>
      {player.hand.map(card => {
        return <OtherPlayerCard
          key={card.id}
          card={card}
          position={position}
        />
      })}
    </CardsContainer>
    <Title position={position}>{player.name}</Title>
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