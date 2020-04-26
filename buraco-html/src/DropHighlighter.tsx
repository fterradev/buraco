import React from "react";

const DropHighlighter = ({ activate }: { activate: boolean }) => {
  return activate ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: 'yellow',
      }}
    />
  ) : null;
}

export default DropHighlighter;