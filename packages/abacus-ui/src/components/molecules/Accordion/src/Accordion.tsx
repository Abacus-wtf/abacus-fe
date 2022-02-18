import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "@icons";
import { Button, ButtonType } from "@atoms";
import { Kilo } from "@typography";

type AccordionProps = {
  title: string;
};

const AccordionButton = styled(Button)`
  display: flex;
  color: ${({ theme }) => theme.colors.core.primary};
  padding: 16px 6px;
  align-items: center;
  width: 100%;
`;

const AnimatedDropdown = styled(Dropdown)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotateZ(-180deg)" : "rotateZ(0)")};
`;

const StyledKilo = styled(Kilo)`
  padding-left: 16px;
`;

const AccordionItems = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-wrap: wrap;
`;

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.core.white};
`;

const Accordion: FunctionComponent<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <AccordionButton
        buttonType={ButtonType.Clear}
        onClick={() => setIsOpen((open) => !open)}
      >
        <AnimatedDropdown isOpen={isOpen} />
        <StyledKilo>{title}</StyledKilo>
      </AccordionButton>
      <AccordionItems isOpen={isOpen}>{children}</AccordionItems>
    </Container>
  );
};

export default Accordion;
