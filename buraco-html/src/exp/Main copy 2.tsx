import { Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { createGlobalStyle } from 'styled-components';
import Comp1 from './Comp1';
import Comp2 from './Comp2';
import Comp3 from './Comp3';

interface GlobalStyleProps {
    initialLeft: number,
    initialTop: number,
}

// const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
//   @keyframes slidein {
//     from {
//     }

//     25% {
//         // left: ${({initialLeft: left}) => left}px;
//         // top: ${({initialTop: top}) => top}px;
//         background-color: red;
//         position: absolute;
//     }

//     50% {
//         left: 300px;
//         top: 900px;
//         position: absolute;
//     }
  
//     75% {
//         left: 500px;
//         top: 500px;
//         position: absolute;
//     }
  
//     to {
//         left: 1000px;
//         top: 250px;
//         position: absolute;
//     }
//   }
// `

// const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
//   @keyframes slidein {
//     from, 50% {
//         left: ${({initialLeft: left}) => left}px;
//         top: ${({initialTop: top}) => top}px;
//         position: absolute;
//     }
  
//     to {
//         left: 1000px;
//         top: 250px;
//         position: absolute;
//     }
//   }
// `

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @keyframes slidein {
    from {
        left: ${({initialLeft: left}) => left}px;
        top: ${({initialTop: top}) => top}px;
        position: absolute;
    }
  
    to {
        left: 1000px;
        top: 250px;
        position: absolute;
    }
  }
`

function Exp() {
    console.log("render");
    const [inner1, setInner1] = useState(0);
    const [position, setPosition] = useState<GlobalStyleProps>({
        initialLeft: 0,
        initialTop: 0
    });
    const transitionStyles: Record<string, React.CSSProperties> = {
        entering: {
            animationDuration: "4s",
            animationName: "slidein"
          },
        // entered: {
        //     backgroundColor: "red"
        // }
      };
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <div style={{
            height: 2000,
            margin: "100px"
        }}>
            <GlobalStyle
                initialLeft={position.initialLeft}
                initialTop={position.initialTop}
            />
            <div>
                Local {inner1}.
            </div>
            <Button onClick={() => {
                setInner1(inner1 + 1);
                setPosition((cur) => {
                    const rect = nodeRef.current?.getBoundingClientRect();
                    const newPosition = rect ? {
                            initialTop: rect.top + window.scrollY,
                            initialLeft: rect.left + window.scrollX
                        } : cur;
                    return newPosition;
                })
            }}>Add</Button>
            <Button onClick={() => {
                setInner1(inner1 - 1);
            }}>Minus</Button>
            <Transition
                appear
                in={inner1 > 1}
                // timeout={5000}
                addEndListener={(done) => {
                    // use the css transitionend event to mark the finish of a transition
                    nodeRef.current?.addEventListener('animationend', () => {
                        console.log('animationend');
                        done();
                    }, false);
                  }}
                onExited={() => {
                    console.log("exited")
                }}
                nodeRef={nodeRef}
            >{state => (
                <div
                    ref={nodeRef}
                    style={{
                        ...transitionStyles[state]
                    }}
                >Teste</div>
            )}</Transition>
            {/* <Comp3 p1={`valor: ${inner1}`} /> */}
        </div>
    );
};

export default Exp;