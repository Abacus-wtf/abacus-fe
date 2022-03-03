import React, { FunctionComponent } from "react";
declare type InputProps = {
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
};
declare const Input: FunctionComponent<InputProps>;
export default Input;
