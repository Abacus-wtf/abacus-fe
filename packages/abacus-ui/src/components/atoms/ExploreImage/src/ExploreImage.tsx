import React, { FunctionComponent } from "react";
import styled from "styled-components";

const ImageContainer = styled.img<{ enableFullBorderRadius?: boolean }>`
  width: 480px;
  height: 480px;
  border-radius: ${({ theme, enableFullBorderRadius }) =>
    enableFullBorderRadius ? theme.borderRadius.section : "0px"};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.section};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.section};
`;

type ExploreImageProps = {
  imgSrc: string;
  enableFullBorderRadius?: boolean;
};

const ExploreImage: FunctionComponent<ExploreImageProps> = ({
  imgSrc,
  enableFullBorderRadius,
}) => (
  <ImageContainer
    src={imgSrc}
    enableFullBorderRadius={enableFullBorderRadius || false}
    alt="Featured Explorer"
  />
);

export default ExploreImage;
