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
};
export declare const Divider: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const ExploreInfoContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare const ExploreCard: FunctionComponent<ExploreCardProps>;
export default ExploreCard;
