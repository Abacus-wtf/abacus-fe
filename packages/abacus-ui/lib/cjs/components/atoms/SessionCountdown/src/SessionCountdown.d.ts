import { FunctionComponent } from "react";
declare type SessionCountdownProps = {
    endTime: number;
    loading?: boolean;
    key?: string;
    onComplete?: () => void;
    completedText?: string;
};
declare const SessionCountdown: FunctionComponent<SessionCountdownProps>;
export default SessionCountdown;
