import { FunctionComponent } from "react";
declare type CheckboxProps = {
    checked: boolean;
    label: string;
    name: string;
    value: string;
    id: string;
    onChange: () => void;
    type?: "checkbox" | "radio";
};
declare const Checkbox: FunctionComponent<CheckboxProps>;
export default Checkbox;
