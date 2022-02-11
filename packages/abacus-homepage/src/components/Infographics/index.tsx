import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Infographic, AbacusCrowdsIcon, AbacusSpotIcon, Media } from "abacus-ui"

const InfographicDivider = styled.span`
  background: linear-gradient(to right, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
  height: 2px;
  width: 75%;
  margin: 4rem auto;

  ${Media.sm`  
    height: unset;
    background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
    width: 4px;
    margin: 50px 0;
  `};
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
      description={
        <>
          <strong>A wisdom of the crowds method to appraise NFT's.</strong>{" "}
          Appraisers, submit weighted votes on a given assets value, make{" "}
          <strong>
            <pre style={{ display: "inline-block" }}>$ABC</pre>
          </strong>{" "}
          on your accuracy. Owners, allow the masses to price your assets in
          this mathematically unbiased protocol.
        </>
      }
      link="https://app.abacus.wtf"
    />
    <InfographicDivider />
    <Infographic
      imgSrc="/abacus_spot_bg.png"
      icon={<AbacusSpotIcon />}
      title="Abacus Spot"
      description={
        <>
          <strong>
            A liquid market appraisal method surrounding the price of an
            individual NFT.
          </strong>{" "}
          Owners, collect yield on your NFT, and always have an appraisal spot
          price. Appraisers, speculate, and find value in over or under valued
          assets.
        </>
      }
      link="https://medium.com/abacus-wtf/introducing-abacus-spot-96ab14ed016a?source=collection_home---4------5-----------------------"
    />
  </InfographicContainer>
)

export default Infographics
