import { FunctionComponent } from "react";
declare type PortalNavbarTypes = {
    balance: number;
    profileName: string;
    profileIcon: string;
    onClick: () => void;
    onBalanceClick: () => void;
};
declare const PortalNavbar: FunctionComponent<PortalNavbarTypes>;
export default PortalNavbar;
