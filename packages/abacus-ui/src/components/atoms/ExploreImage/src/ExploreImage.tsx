/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CrossfadeImage from "react-crossfade-image";

type ExploreImageProps = {
  imgSrc: string;
  enableFullBorderRadius?: boolean;
  onClick?: () => void;
};

const ImageContainer = styled.div<{ enableFullBorderRadius?: boolean }>`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-color: ${({ theme }) => theme.colors.core.white};
  border-radius: ${({ theme, enableFullBorderRadius }) =>
    enableFullBorderRadius ? theme.borderRadius.section : 0};
`;

const ExploreImage: FunctionComponent<ExploreImageProps> = ({
  imgSrc,
  enableFullBorderRadius,
  onClick,
}) => {
  const theme = useContext(ThemeContext);
  const [hover, setHover] = useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <ImageContainer
      enableFullBorderRadius
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <CrossfadeImage
        src={imgSrc}
        enableFullBorderRadius={enableFullBorderRadius || false}
        alt="Featured Explorer"
        style={{
          cursor: onClick !== undefined ? "pointer" : "default",
          maxWidth: "auto",
          maxHeight: "auto",
          width: "100%",
          borderRadius: enableFullBorderRadius ? theme.borderRadius.section : 0,
          borderTopLeftRadius: theme.borderRadius.section,
          borderTopRightRadius: theme.borderRadius.section,
          transition: theme.transitionTime.main,
          transform:
            hover && onClick !== undefined ? "scale(1.10)" : "scale(1)",
        }}
      />
    </ImageContainer>
  );
};

export default ExploreImage;
