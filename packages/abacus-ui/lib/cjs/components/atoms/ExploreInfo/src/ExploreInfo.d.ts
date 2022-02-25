import React, { FunctionComponent } from "react";
declare type ExploreInfoProps = {
    title: string | React.ReactNode;
    text: string | React.ReactNode;
    unit?: string | React.ReactNode;
    isCardBar?: boolean;
    className?: string;
};
declare const ExploreInfo: FunctionComponent<ExploreInfoProps>;
export default ExploreInfo;
