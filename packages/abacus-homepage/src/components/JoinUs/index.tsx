import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H2, Media, SocialLinks } from "abacus-ui"
import { social } from "@config/index"
import { StaticImage } from "gatsby-plugin-image"

const JoinUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  position: relative;
  overflow: hidden;

  ${Media.sm`
    padding: 300px 0;
  `}
`

const JoinUsHeader = styled(H2)`
  font-size: 62;
  line-height: 120%;
  margin-bottom: 30px;
`

const JoinUsCubeContainer = styled.div<{
  top?: string
  right?: string
  left?: string
  bottom?: string
}>`
  position: absolute;
  z-index: 0;
  width: 50vw;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};

  ${Media.lg`
    width: unset;
  `}
`

const index: FunctionComponent = () => (
  <JoinUsContainer>
    <div style={{ zIndex: 1 }}>
      <JoinUsHeader>Join Our Community</JoinUsHeader>
      <SocialLinks {...social} size="30px" />
    </div>
    <JoinUsCubeContainer left="-15%" top="0">
      <StaticImage
        alt=""
        // style={{ height: 15 }}
        src="../../images/dark-cube-1.png"
      />
    </JoinUsCubeContainer>
    <JoinUsCubeContainer right="-15%" bottom="0">
      <StaticImage
        alt=""
        // style={{ height: 15 }}
        src="../../images/dark-cube-3.png"
      />
    </JoinUsCubeContainer>
  </JoinUsContainer>
)

export default index
