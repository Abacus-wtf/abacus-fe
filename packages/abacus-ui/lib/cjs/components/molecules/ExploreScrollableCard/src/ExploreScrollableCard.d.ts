import React, { FunctionComponent } from "react";
import { ExploreCardProps } from "../../ExploreCard";
export declare enum SessionState {
    Vote = 0,
    Weigh = 1,
    SetFinalAppraisal = 2,
    Harvest = 3,
    Claim = 4,
    Complete = 5
}
declare type ExploreScrollableCardProps = {
    cardInfo: ExploreCardProps;
    currentStatus: SessionState;
    loading?: boolean;
    linkComponent?: string | React.ComponentType<any>;
};
declare const ExploreScrollableCard: FunctionComponent<ExploreScrollableCardProps>;
export default ExploreScrollableCard;
