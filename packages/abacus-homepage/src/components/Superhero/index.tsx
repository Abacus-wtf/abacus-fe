import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H1, P, Button, ButtonType, Mega, Media } from "abacus-ui"
// import { StaticImage } from "gatsby-plugin-image"
import ImageLoop from "./ImageLoop"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  padding-top: 130px;
`

const StyledH1 = styled(H1)`
  line-height: 120%;
  font-family: "Bluu Next", sans-serif;
  max-width: 600px;
  text-align: center;

  ${Media.sm`
    font-size: 3.5rem;
  `}
`

const StyledP = styled(P)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.375rem;
  line-height: 120%;
  text-align: center;
`

const StyledButton = styled(Button)`
  ${Media.sm`
    margin-bottom: 100px;
  `}
`

const Superhero: FunctionComponent = () => (
  <Container>
    <StyledH1>Decentralized appraisal tool for NFTS</StyledH1>
    <StyledP>A short tagline to explain how Abacus works.</StyledP>
    <StyledButton buttonType={ButtonType.White} type="button">
      <Mega>Launch App</Mega>
    </StyledButton>
    {/* TODO: Video does not have transparent background */}
    {/* <video muted autoPlay loop>
      <source
        src="/3d-abacus-loop.mp4"
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      />
      <img
        src="/3d-abacus-still.png"
        alt=""
        title="Your browser does not support the <video> tag"
      />
    </video> */}
    {/* <StaticImage alt="" src="../../images/3d-abacus-still.png" /> */}
    <ImageLoop />
  </Container>
)

export default Superhero
