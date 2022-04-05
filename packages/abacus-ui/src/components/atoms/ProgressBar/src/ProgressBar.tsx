import { Kilo } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ProgressBarProps = {
  progress: number;
  label: string | React.ReactNode;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  background: ${({ theme }) => theme.colors.utility.gray};
  border-radius: ${({ theme }) => theme.borderRadius.section};
  position: relative;
  min-height: 24px;
`;

const Progress = styled.div<{ progress: number }>`
  position: absolute;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.section};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.section};
  border-top-right-radius: ${({ theme, progress }) =>
    progress === 1 ? theme.borderRadius.section : 0};
  border-bottom-right-radius: ${({ theme, progress }) =>
    progress === 1 ? theme.borderRadius.section : 0};
  background: ${({ theme, progress }) =>
    progress < 1 ? theme.colors.utility.yellow : theme.colors.utility.green};
  min-width: calc(100% * ${({ progress }) => progress});
  top: 0;
  left: 0;
  bottom: 0;
  transition: min-width 0.3s ease-in-out;
  z-index: 0;
`;

const Label = styled(Kilo)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.core.primary};
`;

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  progress,
  label,
}) => {
  if (progress < 0 || progress > 1) {
    console.warn(
      "Abacus UI | Progress Bar",
      `Progress should be a number between 0 and 1 representing the percentage of progress, you passed: ${progress}`
    );
  }
  return (
    <Container>
      <Progress progress={progress} />
      <Label>{label}</Label>
    </Container>
  );
};

export default ProgressBar;
