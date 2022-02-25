import { FunctionComponent } from "react";
declare type ExploreImageProps = {
    imgSrc: string;
    enableFullBorderRadius?: boolean;
    onClick?: () => void;
    loading?: boolean;
};
declare const ExploreImage: FunctionComponent<ExploreImageProps>;
export default ExploreImage;
