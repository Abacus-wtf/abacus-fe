import { ExploreCardProps } from "components/molecules/ExploreCard/src/ExploreCard";
import { FunctionComponent } from "react";
declare type ExploreCarouselProps = {
    cards: ExploreCardProps[];
    currentMid: number;
    setCurrentMid: (next: number) => void;
};
declare const ExploreCarousel: FunctionComponent<ExploreCarouselProps>;
export default ExploreCarousel;
