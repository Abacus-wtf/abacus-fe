import React, { FunctionComponent } from "react";

type ChevronLeftProps = {
  fill: string;
};

const ChevronLeft: FunctionComponent<ChevronLeftProps> = ({
  fill = "#1C2333",
}) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 14"
    width="14"
    height="14"
  >
    <path
      d="M7 13 1 7l6-6"
      stroke={fill}
      strokeOpacity=".72"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronLeft;
