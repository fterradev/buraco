import { Player as ServerPlayer } from "buraco/dist/game";
import { MovingCard } from "./MovingCard";

interface Player extends Omit<ServerPlayer<MovingCard>, "hasGoneOut" | "team"> {

}

export default Player;