import React, { FunctionComponent } from "react";
import { StylableComponent } from "../models";

interface DropdownProps extends StylableComponent {
  stroke?: string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  stroke = "#1C2333",
  ...rest
}) => (
  <svg
    width="14"
    height="8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
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
