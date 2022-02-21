import { Mega } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import BlueEthLogo from "../../../../static/blue_eth_logo.svg";

type AbacusBalanceProps = {
  balance: number;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  padding: 10px 20px;
  border-radius: 56px;
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  display: flex;
  grid-gap: 10px;
  align-items: center;
  width: fit-content;
`;

const MegaStyled = styled(Mega)`
  color: ${({ theme }) => theme.colors.utility.blue};
  font-weight: 600;
`;

const AbacusBalance: FunctionComponent<AbacusBalanceProps> = ({ balance }) => (
  <Container>
    <img src={BlueEthLogo} alt="Blue Eth Logo" />
    <MegaStyled>{balance} ETH</MegaStyled>
  </Container>
);

export default AbacusBalance;
