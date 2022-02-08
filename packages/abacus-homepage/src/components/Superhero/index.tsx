import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H1, P, Button, ButtonType, Mega, Media } from "abacus-ui"
import Popups from "./Popups"

const Container = styled.div`
  padding-top: 130px;
  position: relative;
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
  margin-bottom: 100px;
`

const GradientContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`

const StyledVideo = styled.video`
  position: relative;
  z-index: 0;
  width: 100%;
  margin-top: -15%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 1),
    rgba(0, 0, 0, 0)
  );
`
type SuperheroProps = {
  openModal: () => void
}

const Superhero: FunctionComponent<SuperheroProps> = ({ openModal }) => (
  <Container>
    <GradientContainer>
      <StyledH1>Decentralized appraisal tool for NFTS</StyledH1>
      <StyledP>A short tagline to explain how Abacus works.</StyledP>
      <StyledButton
        buttonType={ButtonType.White}
        type="button"
        onClick={openModal}
      >
        <Mega>Launch App</Mega>
      </StyledButton>
      <Popups />
    </GradientContainer>
    <StyledVideo muted autoPlay loop playsInline>
      <source
        src="/3d-abacus-loop.mp4"
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      />
      <img
        src="/3d-sequence/1.png"
        alt=""
        title="Your browser does not support the <video> tag"
      />
    </StyledVideo>
  </Container>
)

export default Superhero
