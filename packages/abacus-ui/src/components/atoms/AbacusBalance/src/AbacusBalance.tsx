import { Mega } from "@typography";
import React, { FunctionComponent, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ETH } from "@icons";

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

const AbacusBalance: FunctionComponent<AbacusBalanceProps> = ({ balance }) => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <ETH fill={theme.colors.utility.blue} />
      <MegaStyled>{balance} ETH</MegaStyled>
    </Container>
  );
};

export default AbacusBalance;
