import React, { useEffect, useState } from 'react';

function Comp1({
    p1,
    p2
}: {
    p1: string,
    p2: string[]
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
            {inner1}
            {inner2}
        </div>
    );
};

export default Comp1;