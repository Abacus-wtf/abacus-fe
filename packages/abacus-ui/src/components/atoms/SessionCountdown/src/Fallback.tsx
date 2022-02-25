import React, { FunctionComponent } from "react";
import { LoadingShimmer } from "../../LoadingShimmer";
import { IndivContainer, Text, Subtext } from "./SessionCountdown";

const Fallback: FunctionComponent = () => (
  <div style={{ display: "flex" }}>
    <IndivContainer>
      <Text>
        <LoadingShimmer>00</LoadingShimmer>
      </Text>
      <Subtext>Hours</Subtext>
    </IndivContainer>
    <IndivContainer>
      <Text>
        <LoadingShimmer>00</LoadingShimmer>
      </Text>
      <Subtext>Minutes</Subtext>
    </IndivContainer>
    <IndivContainer>
      <Text>
        <LoadingShimmer>00</LoadingShimmer>
      </Text>
      <Subtext>Seconds</Subtext>
    </IndivContainer>
  </div>
);

export default Fallback;
