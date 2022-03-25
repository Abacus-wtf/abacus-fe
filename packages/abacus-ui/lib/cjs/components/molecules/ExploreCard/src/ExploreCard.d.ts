import React, { FunctionComponent } from "react";
import { SessionState } from "../../ExploreScrollableCard/src/ExploreScrollableCard";
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
    state: SessionState;
    finalAppraisalValue?: number;
    linkComponent?: string | React.ComponentType<any>;
};
declare const ExploreCard: FunctionComponent<ExploreCardProps>;
export default ExploreCard;
