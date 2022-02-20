import React from "react";
export declare enum ButtonType {
    Standard = 0,
    White = 1,
    Gray = 2,
    Clear = 3
}
declare type ButtonProps = {
    children: React.ReactNode;
    disabled?: boolean;
    buttonType?: ButtonType;
    className?: string;
};
declare const Button: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, ButtonProps, never>;
export default Button;
