import { Button } from "components";
import Zetta from "components/typography/Zetta/src/Zetta";
import Mega from "components/typography/Mega/src/Mega";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type InfographicProps = {
  imgSrc: string;
  icon: string;
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
    <img
      src={icon}
      alt={`${title} icon`}
      style={{ height: 58, width: 58, marginBottom: 10 }}
    />
    <ZettaStyled>{title}</ZettaStyled>
    <MegaStyled>{description}</MegaStyled>
    <Button onClick={onClick}>{title}</Button>
  </Container>
);

export default Infographic;
