import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Comp1 from './Comp1';
import Comp2 from './Comp2';
import Comp3 from './Comp3';

function Exp() {
    console.log("render");
    const [inner1, setInner1] = useState(0);
    // const [inner2, setInner2] = useState([{id: "0"}]);
    // const x: number[] = [];
    // console.log(x);
    // x.push(2);
    // console.log(x);
    // x.push(4);
    // console.log(x);
    return (
        <div>
            <div>
            Local {inner1}.
            </div>
            <Button onClick={() => {
                setInner1(inner1 + 1);
                // setInner2((cur) => {
                //     const copy = [...cur]; // copy is a new reference
                //     copy.push({id: copy.length.toString()});
                //     return copy;
                // });
            }}>Add</Button>
            <Comp3 p1={`valor: ${inner1}`} />
        </div>
    );
};

export default Exp;