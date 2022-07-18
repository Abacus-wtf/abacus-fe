import React from "react";
declare type SelectProps = {
    className?: string;
    options: string[];
    value: string;
    disabled?: boolean;
    setValue: React.Dispatch<string>;
};
declare const Select: ({ className, options, value, disabled, setValue, }: SelectProps) => JSX.Element;
export default Select;
