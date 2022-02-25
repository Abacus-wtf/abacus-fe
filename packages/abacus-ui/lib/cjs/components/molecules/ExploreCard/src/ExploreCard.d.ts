import { ButtonType } from "@atoms";
import React, { FunctionComponent } from "react";
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
export declare const Container: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const SecondHalf: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const Title: import("styled-components").StyledComponent<"h3", import("styled-components").DefaultTheme, {}, never>;
export declare const Divider: import("styled-components").StyledComponent<"hr", import("styled-components").DefaultTheme, {}, never>;
export declare const ExploreInfoContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const ButtonStyled: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, {
    children: React.ReactNode;
    disabled?: boolean | undefined;
    buttonType?: ButtonType | undefined;
    className?: string | undefined;
}, never>;
export declare const ProfileGroupContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare const ExploreCard: FunctionComponent<ExploreCardProps>;
export default ExploreCard;
