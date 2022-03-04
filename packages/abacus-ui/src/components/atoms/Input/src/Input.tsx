import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { getUniqueId } from "@utils";
import { Font, WithTheme } from "@theme";
import { Milli, Kilo } from "@typography";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  name: string;
  label?: string;
  id?: string;
  placeholder?: string;
  showEth?: boolean;
  className?: string;
  hint?: React.ReactNode | string;
  disabled?: boolean;
};

type Disableable = {
  disabled?: boolean;
};

const Container = styled.div`
  width: 100%;
`;

const InputContainer = styled.div<Disableable>`
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
`;

const StyledLabel = styled.label<WithTheme>`
  ${Font("milli")}
  text-align: center;
  background-color: ${({ theme }) => theme.colors.core.label};
  padding: 10px;
  height: calc(100% - 17px);
  margin: 8.5px 0;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`;

const StyledInput = styled.input<Disableable>`
  ${Font("mega")}
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

const EthLogo = styled(Milli)`
  background-color: ${({ theme }) => theme.colors.core.border};
  padding: 10px;
  color: ${({ theme }) => theme.colors.core[700]};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  font-weight: 600;
  margin-bottom: 7px;
`;

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  type,
  label,
  name,
  id,
  placeholder,
  showEth,
  className,
  hint,
  disabled,
}) => {
  const ID = typeof id === "string" ? id : getUniqueId("input");
  return (
    <Container className={className}>
      <InputContainer disabled={disabled}>
        {showEth ? <EthLogo>ETH</EthLogo> : null}
        {typeof label === "string" && label && (
          <StyledLabel htmlFor={ID}>{label}</StyledLabel>
        )}
        <StyledInput
          id={ID}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-disabled={disabled}
        />
      </InputContainer>
      {hint && <StyledKilo>{hint}</StyledKilo>}
    </Container>
  );
};

export default Input;
