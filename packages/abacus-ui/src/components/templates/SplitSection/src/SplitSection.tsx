import React, { FunctionComponent } from "react";
import styled from "styled-components";

type SplitSectionProps = {
  leftSection: JSX.Element;
  rightSection: JSX.Element;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 90px;
  width: 100%;
  height: fit-content;
`;

const Divider = styled.div`
  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
  min-width: 2px;
`;

const SplitSection: FunctionComponent<SplitSectionProps> = ({
  leftSection,
  rightSection,
}) => (
  <Container>
    {leftSection}
    <Divider />
    {rightSection}
  </Container>
);

export default SplitSection;
