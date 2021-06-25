import { Card } from "buraco/dist/deck";

export interface MovingCard extends Card {
    leaving?: boolean;
    entering?: boolean;
}
