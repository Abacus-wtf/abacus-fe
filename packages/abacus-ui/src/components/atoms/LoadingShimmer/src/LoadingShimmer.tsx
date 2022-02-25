import styled, { keyframes } from "styled-components";

const Shimmer = keyframes`
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
`;

// You probably want to change this to something semantic or abandon it all together
const LoadingShimmer = styled.div`
  animation-duration: 2.2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${Shimmer};
  animation-timing-function: linear;
  background: ${({ theme }) => theme.colors.core.background};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.core.background} 9%,
    ${({ theme }) => theme.colors.core.white} 18%,
    ${({ theme }) => theme.colors.core.background} 27%
  );
  background-size: 300% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  min-height: 16px;
`;

export default LoadingShimmer;
