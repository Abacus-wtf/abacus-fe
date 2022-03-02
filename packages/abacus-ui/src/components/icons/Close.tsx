import React, { FunctionComponent } from "react";

type CloseProps = {
  stroke?: string;
};

const Close: FunctionComponent<CloseProps> = ({ stroke = "#1C2333" }) => (
  <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m1 1 12 12m0-12L1 13"
      stroke={stroke}
      strokeOpacity=".72"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Close;
