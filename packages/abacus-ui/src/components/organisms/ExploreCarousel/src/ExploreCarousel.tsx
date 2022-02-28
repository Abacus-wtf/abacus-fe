import { ExploreImage } from "@atoms";
import ExploreCard, {
  ExploreCardProps,
} from "components/molecules/ExploreCard/src/ExploreCard";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Media } from "@theme";

type ExploreCarouselProps = {
  cards: ExploreCardProps[];
  currentMid: number;
  setCurrentMid: (next: number) => void;
  loading?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${Media.xl`
    overflow: visible;
  `}
`;

const Container = styled.div`
  position: relative;
  height: fit-content;
  display: grid;
  width: 100%;
  margin-bottom: 50px;
  grid-template-columns: repeat(3, calc(75% - 24px));
  grid-column-gap: 16px;
  align-items: center;
  justify-content: center;

  ${Media.sm`
    grid-template-columns: repeat(3, 50%);
    grid-column-gap: 80px;
  `}

  ${Media.md`
    grid-template-columns: 50% 480px 50%;
  `}
`;

const CarouselItem = styled.div`
  max-width: 480px;
  width: 100%;
  justify-self: center;

  &:first-of-type {
    justify-self: flex-end;
  }

  &:last-of-type {
    justify-self: flex-start;
  }
`;

const ExploreCarousel: FunctionComponent<ExploreCarouselProps> = ({
  cards,
  currentMid,
  setCurrentMid,
  loading,
}) => {
  if (!loading && cards.length < 1) {
    return null;
  }

  return (
    <Wrapper>
      <Container>
        <CarouselItem>
          <ExploreImage
            loading={loading}
            onClick={() => {
              if (currentMid === 0) {
                setCurrentMid(cards.length - 1);
              } else {
                setCurrentMid(currentMid - 1);
              }
            }}
            enableFullBorderRadius
            imgSrc={
              cards[currentMid === 0 ? cards.length - 1 : currentMid - 1]
                ?.nftSrc ?? ""
            }
          />
        </CarouselItem>
        <CarouselItem>
          <ExploreCard {...cards[currentMid]} loading={loading} />
        </CarouselItem>
        <CarouselItem>
          <ExploreImage
            loading={loading}
            onClick={() => {
              if (currentMid === cards.length - 1) {
                setCurrentMid(0);
              } else {
                setCurrentMid(currentMid + 1);
              }
            }}
            enableFullBorderRadius
            imgSrc={
              cards[currentMid === cards.length - 1 ? 0 : currentMid + 1]
                ?.nftSrc ?? ""
            }
          />
        </CarouselItem>
      </Container>
    </Wrapper>
  );
};

export default ExploreCarousel;
