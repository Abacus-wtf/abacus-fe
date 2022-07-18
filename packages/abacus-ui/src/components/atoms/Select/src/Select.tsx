import { Font } from "@theme";
import { DownChevron } from "@icons";
import React from "react";
import styled from "styled-components";

type SelectProps = {
  className?: string;
  options: string[];
  value: string;
  disabled?: boolean;
  setValue: React.Dispatch<string>;
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  position: relative;

  & svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
`;

const StyledSelect = styled.select`
  ${Font("kilo")};
  border: none;
  padding: 13px 20px;
  padding-right: 38px;
  background-color: ${({ theme }) => theme.colors.button.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  appearance: none;
  width: 100%;
`;

const Option = styled.option`
  padding: 12px;
`;

const Select = ({
  className,
  options,
  value,
  disabled,
  setValue,
}: SelectProps) => (
  <Container>
    <StyledSelect
      className={className}
      disabled={disabled}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option) => (
        <Option key={option}>{option}</Option>
      ))}
    </StyledSelect>
    <DownChevron />
  </Container>
);

export default Select;
