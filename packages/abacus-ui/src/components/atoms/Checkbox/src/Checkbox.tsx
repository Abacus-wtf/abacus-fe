import React from "react";
import styled from "styled-components";
import { Font } from "@theme";

type CheckboxProps = {
  checked: boolean;
  label: string | React.ReactNode;
  name: string;
  value: string;
  id: string;
  onChange: () => void;
  type?: "checkbox" | "radio";
  className?: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  margin: 0;
  position: relative;
  width: max-content;
  margin-right: 6px;
  margin-bottom: 12px;
`;

const StyledLabel = styled.label`
  ${Font()};
  cursor: pointer;
  display: block;
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  position: relative;
  background-color: transparent;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  opacity: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;

  &:checked ~ ${StyledLabel} {
    border: 2px solid ${({ theme }) => theme.colors.utility.blue};
    color: ${({ theme }) => theme.colors.utility.blue};
  }

  &:focus ~ ${StyledLabel} {
    outline: 1px solid ${({ theme }) => theme.colors.core.semiTitle};
  }

  &:checked&:focus ~ ${StyledLabel} {
    border: 2px solid ${({ theme }) => theme.colors.utility.blue};
    outline: 1px solid ${({ theme }) => theme.colors.utility.white};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.core.semiTitle};
  }
`;

const Checkbox = ({
  checked,
  label,
  name,
  value,
  id,
  onChange,
  type = "checkbox",
  className,
}: CheckboxProps) => (
  <Container className={className}>
    <StyledInput
      type={type}
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
  </Container>
);

export default Checkbox;
