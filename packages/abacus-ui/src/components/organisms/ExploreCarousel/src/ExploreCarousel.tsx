import { ExploreImage } from "@atoms";
import ExploreCard, {
  ExploreCardProps,
} from "components/molecules/ExploreCard/src/ExploreCard";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";

type ExploreCarouselProps = {
  cards: ExploreCardProps[];
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  grid-gap: 80px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ExploreCarousel: FunctionComponent<ExploreCarouselProps> = ({
  cards,
}) => {
  const [currentMid, setCurrentMid] = useState(0);
  return (
    <Container>
      <ExploreImage
        onClick={() => {
          if (currentMid === 0) {
            setCurrentMid(cards.length - 1);
          } else {
            setCurrentMid(currentMid - 1);
          }
        }}
        enableFullBorderRadius
        imgSrc={
          cards[currentMid === 0 ? cards.length - 1 : currentMid - 1].nftSrc
        }
      />
      <ExploreCard {...cards[currentMid]} />
      <ExploreImage
        onClick={() => {
          if (currentMid === cards.length - 1) {
            setCurrentMid(0);
          } else {
            setCurrentMid(currentMid + 1);
          }
        }}
        enableFullBorderRadius
        imgSrc={
          cards[currentMid === cards.length - 1 ? 0 : currentMid + 1].nftSrc
        }
      />
    </Container>
  );
};

export default ExploreCarousel;
