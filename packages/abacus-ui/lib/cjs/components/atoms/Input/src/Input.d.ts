import React, { FunctionComponent } from "react";
declare type InputProps = {
    value: string;
    onChange: (value: string) => void;
    type: "text" | "number";
    name: string;
    label?: string;
    pill?: string;
    id?: string;
    placeholder?: string;
    className?: string;
    hint?: React.ReactNode | string;
    disabled?: boolean;
    required?: boolean;
    step?: string;
};
declare const Input: FunctionComponent<InputProps>;
export default Input;
