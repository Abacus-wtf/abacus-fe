import { FunctionComponent } from "react";
export declare type SessionCardProps = {
    imgSrc: string;
    title: string;
    bounty: number;
    participants: number;
    appraisal: number;
    nftAddress: string;
    tokenId: string;
    nonce: string;
};
declare const SessionCard: FunctionComponent<SessionCardProps>;
export default SessionCard;
