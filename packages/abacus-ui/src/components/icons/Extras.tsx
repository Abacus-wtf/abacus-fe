import React, { FunctionComponent } from "react";

type ExtrasProps = {
  fill?: string;
};

const Extras: FunctionComponent<ExtrasProps> = ({ fill = "#1C2333" }) => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="12" r="2" fill={fill} />
    <circle cx="12" cy="12" r="2" fill={fill} />
    <circle cx="19" cy="12" r="2" fill={fill} />
  </svg>
);

export default Extras;
