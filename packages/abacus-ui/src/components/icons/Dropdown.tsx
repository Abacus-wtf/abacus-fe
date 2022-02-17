import React, { FunctionComponent } from "react";

type DropdownProps = {
  stroke?: string;
};

const Dropdown: FunctionComponent<DropdownProps> = ({ stroke = "#1C2333" }) => (
  <svg width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 1 7 7 1 1"
      stroke={stroke}
      strokeOpacity=".72"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Dropdown;
