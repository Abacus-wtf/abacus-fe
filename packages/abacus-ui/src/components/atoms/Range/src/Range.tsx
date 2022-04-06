import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 48px;
  margin-top: 16px;
  margin-bottom: -14px;
`;

const StyledInput = styled.input`
  &[type="range"] {
    height: 100%;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
  }
  &[type="range"]:focus {
    outline: none;
  }
  &[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0px;
    cursor: pointer;
    box-shadow: none;
    background: ${({ theme }) => theme.colors.core.primary};
    border-radius: 0px;
    border: 1px solid ${({ theme }) => theme.colors.core.primary};
  }
  &[type="range"]::-webkit-slider-thumb {
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.colors.core.white};
    height: 24px;
    width: 24px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.utility.blue};
    cursor: pointer;
    -webkit-appearance: none;
    transform: translateY(-50%);
  }
  &[type="range"]:focus::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.colors.core.primary};
  }
  &[type="range"]::-moz-range-track {
    width: 100%;
    height: 0px;
    cursor: pointer;
    box-shadow: none;
    background: ${({ theme }) => theme.colors.core.primary};
    border-radius: 0px;
    border: 1px solid ${({ theme }) => theme.colors.core.primary};
  }
  &[type="range"]::-moz-range-thumb {
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.colors.core.white};
    height: 24px;
    width: 24px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.utility.blue};
    cursor: pointer;
  }
  &[type="range"]::-ms-track {
    width: 100%;
    height: 0px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &[type="range"]::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.core.primary};
    border: 1px solid ${({ theme }) => theme.colors.core.primary};
    border-radius: 0px;
    box-shadow: none;
  }
  &[type="range"]::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.core.primary};
    border: 1px solid ${({ theme }) => theme.colors.core.primary};
    border-radius: 0px;
    box-shadow: none;
  }
  &[type="range"]::-ms-thumb {
    margin-top: 1px;
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.colors.core.white};
    height: 24px;
    width: 24px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.utility.blue};
    cursor: pointer;
  }
  &[type="range"]:focus::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.core.primary};
  }
  &[type="range"]:focus::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.core.primary};
  }
`;

const StyledOutput = styled.output<{ visible: boolean }>`
  background: ${({ theme }) => theme.colors.utility.blue};
  color: white;
  padding: 2px 10px;
  position: absolute;
  border-radius: 4px;
  font-size: 14px;
  line-height: 140%;
  left: 0;
  bottom: 40px;
  transform: translateX(-50%);
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};

  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background: ${({ theme }) => theme.colors.utility.blue};
    top: 100%;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%) rotateZ(45deg);
  }
`;

type CustomLockDurationProps = {
  id: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  outputFormatter?: (value: number) => string;
};

const CustomLockDuration: FunctionComponent<CustomLockDurationProps> = ({
  id,
  value,
  setValue,
  min = 0,
  max = 100,
  outputFormatter = null,
}) => {
  const outputRef = useRef<HTMLOutputElement>(null);
  const validValue = value !== null && typeof value !== "undefined";

  useEffect(() => {
    if (validValue && outputRef.current) {
      const newVal = Number(((value - min) * 100) / (max - min));

      outputRef.current.style.left = `calc(${newVal}% + (${
        13 - 26 * (newVal / 100)
      }px))`;
    }
  }, [max, min, validValue, value]);

  return (
    <Container>
      <StyledInput
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <StyledOutput visible={validValue} ref={outputRef}>
        {typeof outputFormatter === "function" ? outputFormatter(value) : value}
      </StyledOutput>
    </Container>
  );
};

export default CustomLockDuration;
