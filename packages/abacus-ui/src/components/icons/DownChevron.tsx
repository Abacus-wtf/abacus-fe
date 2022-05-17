import React from "react";

type DownChevronProps = {
  fill?: string;
  size?: number;
};

const DownChevron = ({ fill = "#323232", size = 8 }: DownChevronProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 6"
    width={size}
    height={size * 0.75}
  >
    <path d="M7.06.227 4 3.28.94.227l-.94.94 4 4 4-4-.94-.94Z" fill={fill} />
  </svg>
);

export { DownChevron };
