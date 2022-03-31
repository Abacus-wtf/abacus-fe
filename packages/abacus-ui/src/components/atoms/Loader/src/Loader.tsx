import React, { FunctionComponent } from "react";
import styled, { keyframes } from "styled-components";

const RECT_HEIGHT = 2.8;
const CIRCLE_RADIUS = 5.65;
enum BarY {
  I = 20,
  II = 20 + 40 / 3,
  III = 20 + 80 / 3,
  IV = 60,
}

const FIRST_BEAD_POSITION = 14 + CIRCLE_RADIUS;
const LAST_BEAD_POSITION = 66 - CIRCLE_RADIUS;
const BEAD_GAP = (66 - CIRCLE_RADIUS - (14 + CIRCLE_RADIUS)) / 3;

const BarIBeadII = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(${BEAD_GAP}px)
  }
  100% {
    transform: translateX(${BEAD_GAP}px)
  }
`;

const BarIBeadI = keyframes`
  0% {
    transform: translateX(${BEAD_GAP}px);
  }
  50% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(0)
  }
`;

const BarIIBeadI = keyframes`
  0% {
    transform: translateX(${BEAD_GAP}px);
  }
  16.666% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(0)
  }
`;

const BarIIBeadII = keyframes`
  0% {
    transform: 0;
  }
  16.666% {
    transform: translateX(-${BEAD_GAP}px)
  }
  83.333% {
    transform: translateX(-${BEAD_GAP}px)
  }
  100% {
    transform: translateX(0)
  }
`;

const BarIIIBeadII = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-${BEAD_GAP}px)
  }
  100% {
    transform: translateX(-${BEAD_GAP}px)
  }
`;

const BarIIIBeadIII = keyframes`
  0% {
    transform: translateX(-${BEAD_GAP}px);
  }
  50% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(0)
  }
`;

const BarIVBeadI = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(${BEAD_GAP}px);
  }
  100% {
    transform: translateX(0);
  }
`;

const BarIVBeadII = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(${BEAD_GAP}px);
  }
  75% {
    transform: translateX(${BEAD_GAP}px);
  }
  100% {
    transform: translateX(0);
  }
`;

const BarIVBeadIII = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(${BEAD_GAP}px);
  }
  50% {
    transform: translateX(${BEAD_GAP}px);
  }
  75% {
    transform: translateX(${BEAD_GAP}px);
  }
  100% {
    transform: translateX(0);
  }
`;

enum BeadsX {
  I = FIRST_BEAD_POSITION,
  II = FIRST_BEAD_POSITION + BEAD_GAP,
  III = LAST_BEAD_POSITION - BEAD_GAP,
  IV = LAST_BEAD_POSITION,
}

const StyledSVG = styled.svg`
  & * {
    transition: all 1s ease;
  }

  & #bar_1 {
    & circle:nth-of-type(1) {
      animation: ${BarIBeadI} 1s ease-in-out 1s infinite alternate;
    }

    & circle:nth-of-type(2) {
      animation: ${BarIBeadII} 1s ease-in-out 0s infinite alternate;
    }
  }

  & #bar_2 {
    & circle:nth-of-type(1) {
      animation: ${BarIIBeadI} 3s ease-in-out 0s infinite alternate;
    }

    & circle:nth-of-type(2) {
      animation: ${BarIIBeadII} 3s ease-in-out 0s infinite alternate;
    }

    & circle:nth-of-type(3) {
      animation: ${BarIIIBeadIII} 3s ease-in-out 1.5s infinite alternate;
    }
  }

  & #bar_3 {
    & circle:nth-of-type(2) {
      animation: ${BarIIIBeadII} 1.5s ease-in-out 0s infinite alternate;
    }

    & circle:nth-of-type(3) {
      animation: ${BarIIIBeadIII} 1.5s ease-in-out 1s infinite alternate;
    }
  }

  & #bar_4 {
    & circle:nth-of-type(1) {
      animation: ${BarIVBeadI} 3s ease-in-out 0s infinite forwards;
    }

    & circle:nth-of-type(2) {
      animation: ${BarIVBeadII} 3s ease-in-out 0s infinite forwards;
    }

    & circle:nth-of-type(3) {
      animation: ${BarIVBeadIII} 3s ease-in-out 0s infinite forwards;
    }
  }
`;

const Loader: FunctionComponent = () => (
  <StyledSVG fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <g filter="url(#a)">
      <rect x="0" y="0" width="80" height="80" rx="8" fill="#fff" />
      <g id="bar_1">
        <rect
          width="60"
          rx="1.412"
          x="10"
          y={BarY.I}
          height={RECT_HEIGHT}
          fill="#3E74FF"
          fillOpacity=".2"
          radius="10"
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.I + RECT_HEIGHT / 2}
          cx={BeadsX.I}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.I + RECT_HEIGHT / 2}
          cx={BeadsX.II}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.I + RECT_HEIGHT / 2}
          cx={BeadsX.IV}
        />
      </g>
      <g id="bar_2">
        <rect
          width="60"
          rx="1.412"
          x="10"
          y={BarY.II}
          height={RECT_HEIGHT}
          fill="#3E74FF"
          fillOpacity=".2"
          radius="10"
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.II + RECT_HEIGHT / 2}
          cx={BeadsX.I}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.II + RECT_HEIGHT / 2}
          cx={BeadsX.III}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.II + RECT_HEIGHT / 2}
          cx={BeadsX.IV}
        />
      </g>
      <g id="bar_3">
        <rect
          width="60"
          rx="1.412"
          x="10"
          y={BarY.III}
          height={RECT_HEIGHT}
          fill="#3E74FF"
          fillOpacity=".2"
          radius="10"
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.III + RECT_HEIGHT / 2}
          cx={BeadsX.I}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.III + RECT_HEIGHT / 2}
          cx={BeadsX.III}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.III + RECT_HEIGHT / 2}
          cx={BeadsX.IV}
        />
      </g>
      <g id="bar_4">
        <rect
          width="60"
          rx="1.412"
          x="10"
          y={BarY.IV}
          height="2.824"
          fill="#3E74FF"
          fillOpacity=".2"
          radius="10"
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.IV + RECT_HEIGHT / 2}
          cx={BeadsX.I}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.IV + RECT_HEIGHT / 2}
          cx={BeadsX.II}
        />
        <circle
          r={CIRCLE_RADIUS}
          fill="#3E74FF"
          cy={BarY.IV + RECT_HEIGHT / 2}
          cx={BeadsX.III}
        />
      </g>
    </g>
    <defs>
      <filter
        id="a"
        x="0"
        y="0"
        width="80"
        height="80"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="14.118" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.854342 0 0 0 0 0.848819 0 0 0 0 0.917847 0 0 0 0.6 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_208" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3.529" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.681333 0 0 0 0 0.646667 0 0 0 0 0.82 0 0 0 0.15 0" />
        <feBlend
          in2="effect1_dropShadow_1_208"
          result="effect2_dropShadow_1_208"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_1_208"
          result="shape"
        />
      </filter>
    </defs>
  </StyledSVG>
);

export default React.memo(Loader);
