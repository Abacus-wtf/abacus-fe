import React, { FunctionComponent } from "react";

type AbacusCrowdsProps = {
  stroke?: string;
};

const AbacusCrowds: FunctionComponent<AbacusCrowdsProps> = ({
  stroke = "white",
}) => (
  <svg
    width="58"
    height="58"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.41667"
      y="2.41667"
      width="21.75"
      height="21.75"
      rx="10.875"
      stroke={stroke}
      strokeWidth="4.83333"
    />
    <rect
      x="33.8333"
      y="2.41667"
      width="21.75"
      height="21.75"
      rx="10.875"
      stroke={stroke}
      strokeWidth="4.83333"
    />
    <rect
      x="2.41667"
      y="33.8333"
      width="21.75"
      height="21.75"
      rx="10.875"
      stroke={stroke}
      strokeWidth="4.83333"
    />
    <rect
      x="33.8333"
      y="33.8333"
      width="21.75"
      height="21.75"
      rx="10.875"
      stroke={stroke}
      strokeWidth="4.83333"
    />
  </svg>
);

export default AbacusCrowds;
