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
    padding: 0 50px;
  `}

  ${Media.lg`
    padding: 0 110px;
  `}
`;

const PetaStyled = styled(Peta)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-align: center;
  font-weight: bold;
`;

const MegaStyled = styled(Mega)`
  flex: 1 0 auto;
  font-size: 1.375rem;
  color: ${({ theme }) => theme.colors.core.primary};
  text-align: center;

  ${Media.md`
    text-align: left;
  `}
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

  ${Media.md`
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
    <PetaStyled>{title}</PetaStyled>
    <IconContainer>{icon}</IconContainer>
    <MegaStyled>{description}</MegaStyled>
    <StyledButton as="a" href={link}>
      {title}
    </StyledButton>
  </Container>
);

export default Infographic;
