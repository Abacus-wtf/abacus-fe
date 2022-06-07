import React, { FunctionComponent } from "react";

type CloseProps = {
  fill?: string;
  size?: number;
};

const Close: FunctionComponent<CloseProps> = ({
  fill = "#1C2333",
  size = 18,
}) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    height={size}
    width={size}
  >
    <path
      d="M17.453 8.668 14 12.121l-3.454-3.453-1.88 1.88 3.454 3.453-3.454 3.454 1.88 1.88L14 15.88l3.453 3.454 1.88-1.88L15.88 14l3.453-3.453-1.88-1.88ZM14 .668A13.321 13.321 0 0 0 .667 14.001c0 7.374 5.96 13.334 13.333 13.334S27.333 21.375 27.333 14C27.333 6.628 21.373.668 14 .668Zm0 24c-5.88 0-10.667-4.787-10.667-10.667S8.12 3.335 14 3.335 24.666 8.12 24.666 14c0 5.88-4.786 10.667-10.666 10.667Z"
      fill={fill}
      fillOpacity=".72"
    />
  </svg>
);

export default Close;
