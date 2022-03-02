import React, { FunctionComponent } from "react";
import styled from "styled-components";
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
  hint?: string;
};

const InputContainer = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: 0px 2px 0px #f6f6f6;

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

const StyledInput = styled.input`
  ${Font("mega")}
  border: none;
  outline: none;
  padding: 0;
  width: 100%;
  padding-right: 6px;
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
}) => {
  const ID = typeof id === "string" ? id : getUniqueId("input");
  return (
    <>
      <InputContainer className={className}>
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
        />
      </InputContainer>
      {typeof hint === "string" && hint && <StyledKilo>{hint}</StyledKilo>}
    </>
  );
};

export default Input;
