import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H2, Media, SocialLinks } from "abacus-ui"
import { social } from "@config/index"
import { StaticImage } from "gatsby-plugin-image"

const JoinUsContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const JoinUsWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  position: relative;
  overflow: hidden;

  ${Media.md`
    padding: 300px 0;
  `}
`

const JoinUsHeader = styled(H2)`
  font-size: 62;
  line-height: 120%;
  margin-bottom: 30px;
`

const JoinUsCubeContainer = styled.div`
  position: absolute;
  display: flex;
  z-index: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

const JoinUsCube = styled.div`
  position: absolute;

  ${Media.sm`
    width: 50%;
    display: flex;
    justify-content: center;
    position: unset;
  `}

  &:first-of-type {
    transform: translateX(-50%);
  }
  &:last-of-type {
    transform: translateX(50%);
  }
`

const index: FunctionComponent = () => (
  <JoinUsContainer>
    <JoinUsCubeContainer>
      <JoinUsCube>
        <StaticImage
          alt=""
          // style={{ height: 15 }}
          src="../../images/dark-cube-1.png"
        />
      </JoinUsCube>
      <JoinUsCube>
        <StaticImage
          alt=""
          // style={{ height: 15 }}
          src="../../images/dark-cube-3.png"
        />
      </JoinUsCube>
    </JoinUsCubeContainer>
    <JoinUsWrapper>
      <JoinUsHeader>Join Our Community</JoinUsHeader>
      <SocialLinks {...social} size="30px" />
    </JoinUsWrapper>
  </JoinUsContainer>
)

export default index
