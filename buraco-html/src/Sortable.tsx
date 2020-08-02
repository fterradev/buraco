import React from "react";
import { ReactSortable, ItemInterface } from "react-sortablejs";

const Sortable = <T extends ItemInterface>(
  props: ReactSortable<T>["props"]
) => {
  return (
    <ReactSortable
      direction="horizontal"
      animation={150}
      ghostClass="sortable-ghost"
      {...props}
    />
  );
};

export default Sortable;