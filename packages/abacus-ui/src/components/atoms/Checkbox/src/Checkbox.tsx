import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";

type CheckboxProps = {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  margin: 0;
  position: relative;
  width: min-content;
  margin-right: 6px;
  margin-bottom: 12px;
`;

const StyledLabel = styled.label`
  ${Font()};
  cursor: pointer;
  z-index: 1;
  display: block;
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.core.white};
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;

  &:checked ~ ${StyledLabel} {
    border: 2px solid ${({ theme }) => theme.colors.core.semiTitle};
  }

  &:focus ~ ${StyledLabel} {
    outline: 1px solid ${({ theme }) => theme.colors.core.semiTitle};
  }
`;

const Checkbox: FunctionComponent<CheckboxProps> = ({
  checked,
  label,
  name,
  onChange,
}) => (
  <Container>
    <StyledInput
      type="checkbox"
      id={name}
      name={name}
      value={name}
      checked={checked}
      onChange={onChange}
    />
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
  </Container>
);

export default Checkbox;
