import React from "react";

type OutboundLinkProps = {
  fill?: string;
  size?: number;
};

const OutboundLink = ({ fill = "#323232", size = 12 }: OutboundLinkProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 13"
    height={size}
  >
    <path
      d="M10.667 11.167H1.333V1.833H6V.5H1.333C.593.5 0 1.1 0 1.833v9.334C0 11.9.593 12.5 1.333 12.5h9.334c.733 0 1.333-.6 1.333-1.333V6.5h-1.333v4.667ZM7.333.5v1.333h2.394L3.173 8.387l.94.94 6.554-6.554v2.394H12V.5H7.333Z"
      fill={fill}
    />
  </svg>
);

export { OutboundLink };
