import React from "react";

type RemoveProps = {
  size?: number;
  fill?: string;
};

const Remove = ({ size = 24, fill = "#F33636" }: RemoveProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={size}
    width={size}
  >
    <path
      d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0Zm6 13.2H6v-2.4h12v2.4Z"
      fill={fill}
    />
  </svg>
);

export { Remove };
