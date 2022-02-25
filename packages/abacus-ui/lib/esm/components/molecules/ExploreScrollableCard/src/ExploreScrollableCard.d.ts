import { ExploreCardProps } from "components/molecules/ExploreCard/src/ExploreCard";
import { FunctionComponent } from "react";
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
};
export declare const Divider: import("styled-components").StyledComponent<"hr", import("styled-components").DefaultTheme, {}, never>;
declare const ExploreScrollableCard: FunctionComponent<ExploreScrollableCardProps>;
export default ExploreScrollableCard;
