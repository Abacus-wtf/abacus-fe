import React, { FunctionComponent } from "react";
declare type InfographicProps = {
    icon: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
    link: string;
};
declare const Infographic: FunctionComponent<InfographicProps>;
export default Infographic;
