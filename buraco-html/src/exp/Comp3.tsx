import React, { useEffect, useState } from 'react';

function Comp3({
    p1,
}: {
    p1: string,
}) {
    const [inner1, setInner1] = useState(p1);
    useEffect(() => {
        setInner1(p1);
    }, [p1]);
    return (
        <div>
            {inner1}
        </div>
    );
};

export default Comp3;