/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CrossfadeImage from "react-crossfade-image";
import { LoadingShimmer } from "../../LoadingShimmer";

type ExploreImageProps = {
  imgSrc: string;
  enableFullBorderRadius?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

const ImageContainer = styled.div<{
  enableFullBorderRadius?: boolean;
  onClick?: ExploreImageProps["onClick"];
}>`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-color: ${({ theme }) => theme.colors.core.white};
  border-radius: ${({ theme, enableFullBorderRadius }) =>
    enableFullBorderRadius ? theme.borderRadius.section : 0};
  transition: transform ${({ theme }) => theme.transitionTime.main};

  &:hover {
    transform: ${({ onClick }) =>
      typeof onClick !== "undefined" ? "scale(1.10)" : "scale(1)"};
  }
`;

const ExploreImage: FunctionComponent<ExploreImageProps> = ({
  imgSrc,
  enableFullBorderRadius,
  onClick,
  loading,
}) => {
  const theme = useContext(ThemeContext);

  if (loading) {
    return (
      <LoadingShimmer>
        <ImageContainer enableFullBorderRadius />
      </LoadingShimmer>
    );
  }

  return (
    <ImageContainer enableFullBorderRadius onClick={onClick}>
      <CrossfadeImage
        src={imgSrc}
        enableFullBorderRadius={enableFullBorderRadius || false}
        alt="Featured Explorer"
        style={{
          cursor: onClick !== undefined ? "pointer" : "default",
          maxWidth: "auto",
          maxHeight: 480,
          objectFit: "contain",
          width: "100%",
          borderRadius: enableFullBorderRadius ? theme.borderRadius.section : 0,
          borderTopLeftRadius: theme.borderRadius.section,
          borderTopRightRadius: theme.borderRadius.section,
        }}
      />
    </ImageContainer>
  );
};

export default ExploreImage;
