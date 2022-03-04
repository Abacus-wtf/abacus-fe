import { FunctionComponent } from "react";
declare type PersistentBannerProps = {
    top?: string;
    bottom?: string;
    type?: "primary" | "warn" | "error" | "success";
};
declare const PersistentBanner: FunctionComponent<PersistentBannerProps>;
export default PersistentBanner;
