import React, { FunctionComponent } from "react";
declare type ProgressBarProps = {
    progress: number;
    label: string | React.ReactNode;
    className?: string;
};
declare const ProgressBar: FunctionComponent<ProgressBarProps>;
export default ProgressBar;
