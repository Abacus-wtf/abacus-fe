import { FunctionComponent } from "react";
declare type CustomLockDurationProps = {
    id: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
    outputFormatter?: (value: number) => string;
    step?: number;
};
declare const CustomLockDuration: FunctionComponent<CustomLockDurationProps>;
export default CustomLockDuration;
