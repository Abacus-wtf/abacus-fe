import { Button } from "@atoms";
import { Zetta, Mega } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Media } from "@theme";

type InfographicProps = {
  imgSrc: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const ImageStyled = styled.img`
  transform: rotate(15deg);
  width: 70%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  width: 100%;

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
  color: ${({ theme }) => theme.colors.core.lightWhite};
  text-align: center;
`;

const Infographic: FunctionComponent<InfographicProps> = ({
  imgSrc,
  icon,
  title,
  description,
  onClick,
}) => (
  <Container>
    <ImageStyled src={imgSrc} />
    {icon}
    <ZettaStyled>{title}</ZettaStyled>
    <MegaStyled>{description}</MegaStyled>
    <Button onClick={onClick}>{title}</Button>
  </Container>
);

export default Infographic;
