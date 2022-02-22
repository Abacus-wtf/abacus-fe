import { Kilo } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { LinkImage } from "@icons";

type OpenseaObjectProps = {
  src: string;
  link: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.a`
  text-decoration: none;
  transition: ${({ theme }) => theme.transitionTime.main};
  display: flex;
  flex-direction: column;
  width: 220px;
  &:hover {
    opacity: 0.8;
  }
`;

const ImageContainer = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.main};
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  padding: 0px 3px;
`;

const KiloStyled = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
  font-weight: 500;
`;

const OpenseaObject: FunctionComponent<OpenseaObjectProps> = ({
  src,
  link,
}) => (
  <Container href={link}>
    <ImageContainer src={src} alt="Related in Collection" />
    <BottomContainer>
      <KiloStyled>OpenSea</KiloStyled>
      <LinkImage />
    </BottomContainer>
  </Container>
);

export default OpenseaObject;
