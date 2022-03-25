import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { LoadingShimmer } from "@atoms";

const Container = styled.div`
  display: flex;
`;

const RoundLoadingShimmer = styled(LoadingShimmer)`
  border-radius: 100%;
  height: 36px;
  width: 36px;
  margin-right: -8px;
`;

const Fallback: FunctionComponent = () => (
  <Container>
    <RoundLoadingShimmer />
    <RoundLoadingShimmer />
    <RoundLoadingShimmer />
    <RoundLoadingShimmer />
    <RoundLoadingShimmer />
  </Container>
);

export default Fallback;
