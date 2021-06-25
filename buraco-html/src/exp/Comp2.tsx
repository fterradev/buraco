import React, { useEffect, useState } from 'react';
import Sortable from "../Sortable";

function Comp2({
  p1,
  p2
}: {
  p1: string,
  p2: { id: string }[]
}) {
  const [inner1, setInner1] = useState(p1);
  const [inner2, setInner2] = useState(p2);
  useEffect(() => {
    setInner1(p1);
  }, [p1]);
  useEffect(() => {
    setInner2(p2);
  }, [p2]);
  return (
    <div>
      <div>
        {inner1}
        {/* {inner2} */}
      </div>
      <Sortable
        list={inner2}
        setList={setInner2}
        animation={200}
        group={{
          name: "mesa",
          put: true
        }}
      >
        {inner2.map((card, index) => (
          <div key={card.id} style={{ border: "1px solid red"}}>
            id: {card.id}
          </div>
        ))}
      </Sortable>
    </div>
  );
};

export default Comp2;