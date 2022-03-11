import React, { FunctionComponent } from "react"
import { Exa } from "abacus-ui"
import styled from "styled-components"
import { useEthToUSD } from "@state/application/hooks"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { round2Decimals } from "utils"
import { FlexEndColumn, StyledMiniList } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"

const LoserImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px;
`
type LoserProps = {
  stake: number
}

const Loser: FunctionComponent<LoserProps> = ({ stake }) => {
  const claimData = useClaimPayoutData()
  const stakeLostUSD = useEthToUSD(stake)
  const ethBalance = round2Decimals(claimData.ethCredit)
  const balanceUSD = useEthToUSD(ethBalance)
  return (
    <FlexEndColumn>
      <div style={{ textAlign: "center" }}>
        <LoserImage
          alt="Pepe sticking a fork in an electrical outlet"
          src="/loser.png"
        />
        <TitleContainer style={{ textAlign: "center", marginTop: "12px" }}>
          <Exa style={{ fontFamily: "Bluu Next" }}>You lost {stake} ETH!</Exa>
        </TitleContainer>
        <Description>You lost the {stake} ETH you put at stake 😢</Description>
      </div>
      <StyledMiniList
        info={{
          "Lost from your stake": `${stake} ETH ($${stakeLostUSD})`,
          "Abacus Balance": `${ethBalance} ETH ($${balanceUSD})`,
        }}
        isDark
      />
      <div style={{ marginTop: "40px" }} />
    </FlexEndColumn>
  )
}

export default Loser
