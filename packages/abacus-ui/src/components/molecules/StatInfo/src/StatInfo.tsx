import { Font } from "@theme";
import Mega from "components/typography/Mega/src/Mega";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
`;

const StatText = styled.div`
  ${Font("yotta", "Bluu Next")};
  color: ${({ theme }) => theme.colors.core.primary};
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Title = styled(Mega)`
  color: ${({ theme }) => theme.colors.core[900]};
  font-size: 22px;
  text-align: center;
`;

type StatInfoProps = {
  stat: string;
  title: string;
  showEthIcon?: boolean;
  className?: string;
};

const StatInfo: FunctionComponent<StatInfoProps> = ({
  stat,
  title,
  showEthIcon = false,
  className,
}) => (
  <Container className={className}>
    <StatText>
      {stat}{" "}
      {showEthIcon ? (
        <div style={{ marginLeft: 8, marginTop: 5, fontSize: 59 }}>Ξ</div>
      ) : null}
    </StatText>
    <Title>{title}</Title>
  </Container>
);

export default StatInfo;
