import React, { FunctionComponent } from "react";

type CheckmarkProps = {
  stroke?: string;
  size?: number;
};

const Checkmark: FunctionComponent<CheckmarkProps> = ({
  stroke = "#23CE7C",
  size = 13,
}) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 11"
    height={size}
    width={size}
  >
    <path
      d="m.958 6.292 3.167 3.167 7.917-7.917"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Checkmark;
