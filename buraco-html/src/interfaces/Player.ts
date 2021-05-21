import { Player as ServerPlayer } from "buraco/dist/game";

type Player = Omit<ServerPlayer, "hasGoneOut" | "team">;

export default Player;