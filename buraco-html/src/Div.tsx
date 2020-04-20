import React from "react";

function Div(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`${props.className} disable-selection`}
    />
  );
}

export default Div;