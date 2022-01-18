import React from "react";
import { FormInput } from "shards-react";
export declare const MainInput: import("styled-components").StyledComponent<any, any, any, string | number | symbol>;
interface InputWithTitle extends React.ComponentProps<FormInput> {
    title: string;
    id: string;
    type?: string;
    infoText?: string;
}
export declare const InputWithTitle: ({ title, type, id, infoText, ...props }: InputWithTitle) => JSX.Element;
interface InputWithTitleAndButtonProps extends InputWithTitle {
    buttonText: string;
    onClick: () => void;
}
export declare const InputWithTitleAndButton: ({ title, type, id, buttonText, onClick, ...props }: InputWithTitleAndButtonProps) => JSX.Element;
export {};
