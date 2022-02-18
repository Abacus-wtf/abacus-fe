import React, { FunctionComponent } from "react";

type AbacusSpotProps = {
  stroke?: string;
};

const AbacusSpot: FunctionComponent<AbacusSpotProps> = ({
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
      width="53.1667"
      height="53.1667"
      rx="26.5833"
      stroke={stroke}
      strokeWidth="4.83333"
    />
    <rect
      x="16.4167"
      y="16.4167"
      width="25.1667"
      height="25.1667"
      rx="12.5833"
      stroke={stroke}
      strokeWidth="4.83333"
    />
  </svg>
);

export default AbacusSpot;
