import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { H1, P, Button, ButtonType, Mega, Media, Yotta } from "abacus-ui"

const Container = styled.div`
  padding-top: 110px;
  position: relative;
  width: 100%;
  overflow: hidden;
`

const Wrapper = styled.div`
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const StyledH1 = styled(H1)`
  font-size: 50px;
  line-height: 120%;
  font-weight: bold;
  text-align: center;
  margin: 0;

  ${Media.sm`
    font-size: 100px;
  `}
`

const GradientText = styled.div`
  width: min-content;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    #7b61ff 18.75%,
    #3e74ff 51.56%,
    #00cc88 82.29%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`

const StyledP = styled(P)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.core[900]};
  font-size: 22px;
  padding: 0 20px;
  line-height: 120%;
  text-align: center;
`

const StyledButton = styled(Button)`
  border-radius: 35px;
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 120px;
  padding: 22px 30px;

  ${Media.sm`
    padding: 22px 110px;
  `}
`

const BackgroundText = styled(Yotta)`
  position: absolute;
  font-size: 200px;
  z-index: -10;
  font-family: "Bluu next";
  font-weight: bold;
  color: ${({ theme }) => theme.colors.utility.blue};
  opacity: 0.05;
  overflow: hidden;
  transform: translateX(-25%);
  left: 0;

  ${Media.md`
    font-size: 500px;
  `}
`

type SuperheroProps = {
  openModal: () => void
}

const Superhero: FunctionComponent<SuperheroProps> = ({ openModal }) => (
  <Container>
    <BackgroundText>Abacus</BackgroundText>
    <Wrapper>
      <StyledH1>
        NFT Valuation<GradientText>Reimagined</GradientText>
      </StyledH1>
      <StyledP>
        Abacus is a revolutionary NFT valutaion system combining optimistic
        rollups and proof of stake logic.{" "}
      </StyledP>
      <StyledP>
        <a href="/Abacus_Whitepaper.pdf">{"Learn more about Abacus >"}</a>
      </StyledP>
      <StyledButton
        buttonType={ButtonType.Standard}
        type="button"
        onClick={openModal}
      >
        <Mega>Launch App</Mega>
      </StyledButton>
    </Wrapper>
  </Container>
)

export default Superhero
