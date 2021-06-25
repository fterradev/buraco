import React from "react";
import { ReactSortable, ItemInterface } from "react-sortablejs";

const Sortable = <T extends ItemInterface>(
  props: ReactSortable<T>["props"]
) => {
  const instance = React.useRef<ReactSortable<T>>(null);
  React.useEffect(() => {
    // if (instance) console.log(instance);
  });
  return (
    <ReactSortable
      direction="horizontal"
      animation={150}
      ghostClass="sortable-ghost"
      {...props}
      ref={instance}
    />
  );
};

export default Sortable;