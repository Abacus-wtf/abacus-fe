import React from "react";
declare type SelectProps = {
    className?: string;
    options: string[];
    value: string;
    setValue: React.Dispatch<string>;
};
declare const Select: ({ className, options, value, setValue }: SelectProps) => JSX.Element;
export default Select;
