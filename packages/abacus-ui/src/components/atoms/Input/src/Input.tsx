import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { getUniqueId } from "@utils";
import { Font } from "@theme";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  name: string;
  label?: string;
  id?: string;
};

const InputContainer = styled.div`
  height: 54px;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 0px #f6f6f6;
`;

const StyledLabel = styled.label`
  ${Font("milli")}
`;

const StyledInput = styled.input`
  ${Font("mega")}
  border: none;
  outline: none;
  padding: 0;

  &:focus,
  &:active,
  &:focus-visible {
    box-shadow: 0px 2px 0px #6b6b6b;
  }
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
