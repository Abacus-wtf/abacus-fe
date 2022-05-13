import React, { FunctionComponent, useState } from "react";
import styled, { css } from "styled-components";
import { getUniqueId } from "@utils";
import { Font } from "@theme";
import { Kilo } from "@typography";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  name: string;
  label?: string;
  pill?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
  className?: string;
  hint?: React.ReactNode | string;
  disabled?: boolean;
  required?: boolean;
  step?: string;
};

type Disableable = {
  disabled?: boolean;
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
`;

type InputContainerProps = Disableable & {
  pristine: boolean;
  required?: boolean;
  value: string;
};

const InputContainer = styled.div<InputContainerProps>`
  background-color: white;
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: 0px 2px 0px #f6f6f6;

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: rgba(239, 239, 239, 0.3);
          color: rgb(84, 84, 84);
          cursor: not-allowed;
        `
      : ""}

  &:focus-within {
    box-shadow: 0px 2px 0px #6b6b6b;
  }

  ${({ required, pristine, theme, value }) =>
    required && !pristine && !value
      ? css`
          box-shadow: 0px 2px 0px ${theme.colors.utility.red};
        `
      : ""}
`;

const ExteriorLabel = styled.label`
  ${Font("mega")}
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
`;

const Pill = styled.span<{ isString: boolean }>`
  ${Font("milli")}
  text-align: center;
  background-color: ${({ theme, isString }) =>
    isString ? theme.colors.core.label : "transparent"};
  padding: ${({ isString }) => (isString ? "10px" : "0")};
  height: calc(100% - 17px);
  margin: 8.5px 0;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`;

const StyledInput = styled.input<Disableable>`
  ${Font("mega")}
  font-size: 22px;
  border: none;
  outline: none;
  padding: 0;
  width: 100%;
  padding-right: 6px;

  ${({ disabled }) =>
    disabled
      ? css`
          background: unset;
          cursor: not-allowed;
        `
      : ""}
`;

const StyledKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core["900"]};
  margin-top: 10px;
`;

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  type,
  label,
  pill,
  name,
  id,
  placeholder,
  className,
  hint,
  disabled = false,
  required = false,
  step = "0.1",
}) => {
  const [pristine, setPristine] = useState(true);
  const ID = typeof id === "string" ? id : getUniqueId("input");
  return (
    <Container className={className}>
      {label && <ExteriorLabel htmlFor={ID}>{label}</ExteriorLabel>}
      <InputContainer
        disabled={disabled}
        pristine={pristine}
        required={required}
        value={value}
      >
        {pill ? <Pill isString={typeof pill === "string"}>{pill}</Pill> : null}
        <StyledInput
          id={ID}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-disabled={disabled}
          required={required}
          onFocus={() => setPristine(false)}
          step={step}
        />
      </InputContainer>
      {hint && <StyledKilo>{hint}</StyledKilo>}
    </Container>
  );
};

export default Input;
