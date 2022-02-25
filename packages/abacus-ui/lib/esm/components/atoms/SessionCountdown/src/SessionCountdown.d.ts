import { FunctionComponent } from "react";
declare type SessionCountdownProps = {
    endTime: number;
    loading?: boolean;
};
export declare const IndivContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const Text: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const Subtext: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare const SessionCountdown: FunctionComponent<SessionCountdownProps>;
export default SessionCountdown;
