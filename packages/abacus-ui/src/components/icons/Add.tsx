import React from "react";

type AddProps = {
  size?: number;
  fill?: string;
};

const Add = ({ size = 24, fill = "#1C2333" }: AddProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 17"
    height={size}
    width={size}
  >
    <path
      d="M8 .5c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8Zm4 8.8H8.8v3.2H7.2V9.3H4V7.7h3.2V4.5h1.6v3.2H12v1.6Z"
      fill={fill}
    />
  </svg>
);

export { Add };
