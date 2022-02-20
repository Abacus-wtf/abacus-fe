import { ExploreCardProps } from "@molecules";
import { SessionState } from "components/molecules/ExploreScrollableCard/src/ExploreScrollableCard";
import { FunctionComponent } from "react";
declare type PricingSessionMainComponentProps = {
    currentState: SessionState;
    participation?: {
        appraisal: number;
        stake: number;
        seedNumber: string;
    };
    cardInfo: ExploreCardProps;
    currentEthBalance: number;
    openDepositModal: () => void;
    onMainClick: () => void;
};
declare const PricingSessionMainComponent: FunctionComponent<PricingSessionMainComponentProps>;
export default PricingSessionMainComponent;
