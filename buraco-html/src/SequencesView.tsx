import React from "react";
import { CardSet } from "buraco/dist/deck";
import TeamSequencesView from "./TeamSequencesView";

function SequencesView() {
  return <div>
    <TeamSequencesView name="Deles" />
    <TeamSequencesView name="Nossas" />
  </div>;
}

export default SequencesView;