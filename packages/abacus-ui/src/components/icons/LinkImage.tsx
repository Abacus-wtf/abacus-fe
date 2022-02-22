import React, { FunctionComponent } from "react";

type LinkImageProps = {
  stroke?: string;
};

const LinkImage: FunctionComponent<LinkImageProps> = ({
  stroke = "#1C2333",
}) => (
  <svg width="15" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 1.5h10m0 0v10m0-10-13 13"
      stroke={stroke}
      strokeOpacity=".6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LinkImage;
