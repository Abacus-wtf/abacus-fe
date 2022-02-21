import React, { FunctionComponent } from "react";
declare type CardWithTitleProps = {
    title: string;
    children: JSX.Element;
    style?: React.CSSProperties;
    noBorder?: boolean;
};
declare const CardWithTitle: FunctionComponent<CardWithTitleProps>;
export default CardWithTitle;
