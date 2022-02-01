import { FunctionComponent } from "react";
export declare enum ButtonType {
    Standard = 0,
    White = 1,
    Clear = 2
}
declare type ButtonProps = {
    children: any;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonType;
};
declare const Button: FunctionComponent<ButtonProps>;
export default Button;
