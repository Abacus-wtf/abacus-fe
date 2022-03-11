import styled, { keyframes } from "styled-components";

const Shimmer = keyframes`
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
`;

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
    ${({ theme }) => theme.colors.core.lightWhite} 18%,
    ${({ theme }) => theme.colors.core.background} 27%
  );
  background-size: 300% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  min-height: 16px;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  color: transparent !important;

  & * {
    color: transparent !important;
  }
`;

export default LoadingShimmer;
