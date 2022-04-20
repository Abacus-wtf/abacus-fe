import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { getUniqueId } from "@utils";
import { Font, WithTheme } from "@theme";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  name: string;
  label?: string;
  id?: string;
};

const InputContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 0px #f6f6f6;

  &:focus-within {
    box-shadow: 0px 2px 0px #6b6b6b;
  }
`;

const StyledLabel = styled.label<WithTheme>`
  ${Font("milli")}
  text-align: center;
  background-color: ${({ theme }) => theme.colors.utility.white};
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
`;

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  type,
  label,
  name,
  id,
}) => {
  const ID = typeof id === "string" ? id : getUniqueId("input");
  return (
    <InputContainer>
      {typeof label === "string" && label && (
        <StyledLabel htmlFor={ID}>{label}</StyledLabel>
      )}
      <StyledInput
        id={ID}
        name={name}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

export default Input;
