import { FunctionComponent } from "react";
declare type CardBarProps = {
    title: string;
    poolAmount: number;
    poolAmountUSD: number;
    participants: string[];
    owner: string;
};
declare const CardBar: FunctionComponent<CardBarProps>;
export default CardBar;
