import { FunctionComponent } from "react";
declare type RangeProps = {
    id: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
    outputFormatter?: (value: number) => string;
    step?: number;
};
declare const CustomLockDuration: FunctionComponent<RangeProps>;
export default CustomLockDuration;
