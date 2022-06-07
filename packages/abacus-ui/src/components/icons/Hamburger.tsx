import React from "react";

type HamburgerProps = {
  fill?: string;
  size?: number;
};

const Hamburger = ({ fill = "#323232", size = 18 }: HamburgerProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 12"
    width={size}
    height={size * (12 / 18)}
  >
    <path
      d="M0 11a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H1a1 1 0 0 0-1 1Zm0-5a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H1a1 1 0 0 0-1 1Zm1-6a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H1Z"
      fill={fill}
    />
  </svg>
);

export { Hamburger };
