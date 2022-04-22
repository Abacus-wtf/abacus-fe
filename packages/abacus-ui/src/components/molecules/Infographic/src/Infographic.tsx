import { Button } from "@atoms";
import { Mega, Peta } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Media } from "@theme";

type InfographicProps = {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  link: string;
};

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

const PetaStyled = styled(Peta)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-align: center;
  font-weight: bold;
`;

const MegaStyled = styled(Mega)`
  flex: 1 0 auto;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.core.primary};
  text-align: center;
`;

const IconContainer = styled.div`
  height: 100px;
  aspect-ratio: 1 / 1;
`;

const StyledButton = styled(Button)`
  border-radius: 35px;
  margin: 0 auto;
  margin-top: 4px;
  padding: 22px 30px;

  ${Media.sm`
    padding: 22px 100px;
  `}
`;

const Infographic: FunctionComponent<InfographicProps> = ({
  icon,
  title,
  description,
  link,
}) => (
  <Container>
    <IconContainer>{icon}</IconContainer>
    <PetaStyled>{title}</PetaStyled>
    <MegaStyled>{description}</MegaStyled>
    <StyledButton as="a" href={link}>
      {title}
    </StyledButton>
  </Container>
);

export default Infographic;
