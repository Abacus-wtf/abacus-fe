import { FunctionComponent } from "react";
export declare type ExploreCardProps = {
    nftSrc: string;
    nftTitle: string;
    endTime: number;
    numParticipants: number;
    poolAmount: number;
    poolAmountDollars: number;
    imgs: string[];
    link: string;
    loading?: boolean;
};
declare const ExploreCard: FunctionComponent<ExploreCardProps>;
export default ExploreCard;
