import { Kilo } from "@typography";
import { CardWithTitle } from "components/molecules/CardWithTitle";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { LinkImage } from "@icons";

type PriceHistoryProps = {
  etherscanLink: string;
  openseaLink: string;
};

const Link = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0px;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitionTime.main};
  &:hover {
    opacity: 0.8;
  }
`;

const KiloStyled = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
  font-weight: 500;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  grid-gap: 5px;
`;

const PriceHistory: FunctionComponent<PriceHistoryProps> = ({
  etherscanLink,
  openseaLink,
}) => (
  <CardWithTitle title="Price History">
    <Container>
      <Link style={{ paddingTop: 5 }} href={etherscanLink}>
        <KiloStyled>Etherscan</KiloStyled>
        <LinkImage />
      </Link>
      <Link href={openseaLink}>
        <KiloStyled>OpenSea</KiloStyled>
        <LinkImage />
      </Link>
    </Container>
  </CardWithTitle>
);

export default PriceHistory;
