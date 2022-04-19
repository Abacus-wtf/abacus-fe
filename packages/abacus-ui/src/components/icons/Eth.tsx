import React, { FunctionComponent } from "react";

type EthProps = {
  fill?: string;
  altFill?: string;
};

const Eth: FunctionComponent<EthProps> = ({
  fill = "#1C2333",
  altFill = "#FFF",
}) => (
  <svg width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16.5C0 7.387 7.387 0 16.5 0S33 7.387 33 16.5 25.613 33 16.5 33 0 25.613 0 16.5Z"
      fill={fill}
      fillOpacity=".6"
    />
    <path
      d="m10 16.797 6.507 2.845V6L10 16.797ZM16.508 6v13.642l6.505-2.845L16.508 6Z"
      fill={altFill}
    />
    <path
      opacity=".8"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.507 27.198 10 19.03l6.507 2.845v5.323Zm0 0v-5.323l6.51-2.845-6.51 8.168Z"
      fill={altFill}
    />
  </svg>
);

export default Eth;
