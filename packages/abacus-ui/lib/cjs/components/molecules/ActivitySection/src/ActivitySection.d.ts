import { FunctionComponent } from "react";
declare type ActivitySectionProps = {
    activityList: {
        id: string;
        img: string;
        appraisalAmount: number;
        stakeAmount: number;
        appraisorAddress: string;
    }[];
};
declare const ActivitySection: FunctionComponent<ActivitySectionProps>;
export default ActivitySection;
