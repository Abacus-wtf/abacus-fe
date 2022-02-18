import { FunctionComponent } from "react";
declare type CheckboxProps = {
    checked: boolean;
    label: string;
    name: string;
    onChange: () => void;
};
declare const Checkbox: FunctionComponent<CheckboxProps>;
export default Checkbox;
