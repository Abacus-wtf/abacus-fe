import { Font } from "@theme";
import { Mega } from "components";
import { Nina } from "components/typography/Nina";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
`;

const StatText = styled.div`
  ${Font("tena", "Bluu Next")};
  color: ${({ theme }) => theme.colors.core.white};
  text-align: center;
  display: flex;
`;

const Title = styled(Mega)`
  color: ${({ theme }) => theme.colors.core.lightWhite};
  text-align: center;
`;

type StatInfoProps = {
  stat: string;
  title: string;
  showEthIcon?: boolean;
};

const StatInfo: FunctionComponent<StatInfoProps> = ({
  stat,
  title,
  showEthIcon = false,
}) => (
  <Container>
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
