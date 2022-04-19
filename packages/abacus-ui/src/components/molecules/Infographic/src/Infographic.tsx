import { Button } from "@atoms";
import { Zetta, Mega } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Media } from "@theme";

type InfographicProps = {
  imgSrc: string;
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  link: string;
};

const ImageContainer = styled.div`
  position: relative; /* If you want text inside of it */
  max-width: 400px;
  width: 70%;

  ${Media.lg`
    height: 350px;
  `}
`;

const ImageStyled = styled.img`
  transform: rotate(15deg);
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  width: 100%;
  justify-content: space-evenly;

  ${Media.sm`
    padding: 0 90px;
    width: calc(100% - 180px);
  `}
`;

const ZettaStyled = styled(Zetta)`
  font-family: "Bluu Next";
  color: ${({ theme }) => theme.colors.core.white};
  text-align: center;
`;

const MegaStyled = styled(Mega)`
  flex: 1 0 auto;
  color: ${({ theme }) => theme.colors.core.lightWhite};
  text-align: center;
`;

const Infographic: FunctionComponent<InfographicProps> = ({
  imgSrc,
  icon,
  title,
  description,
  link,
}) => (
  <Container>
    <ImageContainer>
      <ImageStyled src={imgSrc} />
    </ImageContainer>
    {icon}
    <ZettaStyled>{title}</ZettaStyled>
    <MegaStyled>{description}</MegaStyled>
    <Button as="a" href={link}>
      {title}
    </Button>
  </Container>
);

export default Infographic;
