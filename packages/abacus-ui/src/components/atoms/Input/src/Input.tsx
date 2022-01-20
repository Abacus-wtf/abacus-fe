import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { getUniqueId } from "@utils";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  name: string;
  label?: string;
  id?: string;
};

const StyledLabel = styled.label``;

const StyledInput = styled.input``;

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
    <>
      {typeof label === "string" && (
        <StyledLabel htmlFor={ID}>{label}</StyledLabel>
      )}
      <StyledInput
        id={ID}
        name={name}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default Input;
