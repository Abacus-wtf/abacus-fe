import React, { FunctionComponent } from "react";
declare type MiniListProps = {
    info: {
        [key: string]: string | React.ReactNode;
    };
    isDark?: boolean;
    className?: string;
};
declare const MiniList: FunctionComponent<MiniListProps>;
export default MiniList;
