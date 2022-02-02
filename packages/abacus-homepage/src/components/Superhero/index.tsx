import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H1, P, Button, ButtonType, Mega } from "abacus-ui"
import { StaticImage } from "gatsby-plugin-image"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-top: 130px;
`

const StyledH1 = styled(H1)`
  font-size: 56px;
  line-height: 67.2px;
  font-family: "Bluu Next", sans-serif;
  max-width: 600px;
  text-align: center;
`

const StyledP = styled(P)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 22px;
  line-height: 26.63px;
`

const StyledButton = styled(Button)`
  margin-bottom: 300px;
`

const Superhero: FunctionComponent = () => (
  <Container>
    <StyledH1>Decentralized appraisal tool for NFTS</StyledH1>
    <StyledP>A short tagline to explain how Abacus works.</StyledP>
    <StyledButton type={ButtonType.White}>
      <Mega>Launch App</Mega>
    </StyledButton>
    <StaticImage
      alt=""
      // style={{ height: 15 }}
      src="../../images/3d-row.png"
    />
  </Container>
)

export default Superhero
