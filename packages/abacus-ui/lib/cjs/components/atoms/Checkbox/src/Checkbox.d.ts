import React from "react";
declare type CheckboxProps = {
    checked: boolean;
    label: string | React.ReactNode;
    name: string;
    value: string;
    id: string;
    onChange: () => void;
    type?: "checkbox" | "radio";
    className?: string;
};
declare const Checkbox: ({ checked, label, name, value, id, onChange, type, className, }: CheckboxProps) => JSX.Element;
export default Checkbox;
