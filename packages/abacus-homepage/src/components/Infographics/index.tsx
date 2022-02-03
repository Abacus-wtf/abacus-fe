import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Infographic, AbacusCrowdsIcon, AbacusSpotIcon, Media } from "abacus-ui"

const InfographicDivider = styled.span`
  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
  border-radius: 100px;
  width: 4px;
  margin: 50px 0;
`

const InfographicContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${Media.sm`
    flex-direction: row;
  `}
`

const Infographics: FunctionComponent = () => (
  <InfographicContainer>
    <Infographic
      imgSrc="/abacus_crowds_bg.png"
      icon={<AbacusCrowdsIcon />}
      title="Abacus Crowds"
      description="A short description about how Abacus Crowd works in a simple way."
      onClick={() => {
        console.log("click")
      }}
    />
    <InfographicDivider />
    <Infographic
      imgSrc="/abacus_spot_bg.png"
      icon={<AbacusSpotIcon />}
      title="Abacus Spot"
      description="A short description about how Abacus Spot works in a simple way."
      onClick={() => {
        console.log("click")
      }}
    />
  </InfographicContainer>
)

export default Infographics
