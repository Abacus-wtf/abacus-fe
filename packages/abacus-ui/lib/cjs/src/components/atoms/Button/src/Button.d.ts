import React, { FunctionComponent } from "react";
export declare enum ButtonType {
    Standard = 0,
    White = 1,
    Clear = 2
}
declare type ButtonProps = {
    children: any;
    onClick?: () => void;
    disabled?: boolean;
    buttonType?: ButtonType;
    className?: string;
};
declare const Button: FunctionComponent<ButtonProps & React.HTMLProps<HTMLButtonElement>>;
export default Button;
