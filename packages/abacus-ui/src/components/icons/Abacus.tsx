import React, { FunctionComponent } from "react";

type AbacusProps = {
  fill?: string;
};

const Abacus: FunctionComponent<AbacusProps> = ({ fill = "white" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="20"
      height="1"
      rx="0.5"
      transform="matrix(1 0 0 -1 0 3.75)"
      fill={fill}
    />
    <circle r="2.5" transform="matrix(1 0 0 -1 17.5 3)" fill={fill} />
    <circle r="2.5" transform="matrix(1 0 0 -1 10 3)" fill={fill} />
    <rect
      width="20"
      height="1"
      rx="0.5"
      transform="matrix(1 0 0 -1 0 10.75)"
      fill={fill}
    />
    <circle r="2.5" transform="matrix(1 0 0 -1 10 10)" fill={fill} />
    <circle r="2.5" transform="matrix(1 0 0 -1 2.5 10)" fill={fill} />
    <rect
      width="20"
      height="1"
      rx="0.5"
      transform="matrix(1 0 0 -1 0 17.75)"
      fill={fill}
    />
    <circle r="2.5" transform="matrix(1 0 0 -1 17.5 17)" fill={fill} />
    <circle r="2.5" transform="matrix(1 0 0 -1 2.5 17)" fill={fill} />
  </svg>
);

export default Abacus;
