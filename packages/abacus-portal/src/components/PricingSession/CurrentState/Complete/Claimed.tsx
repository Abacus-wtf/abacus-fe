import React, { FunctionComponent } from "react"
import { Exa, Button, ButtonType } from "abacus-ui"
import styled from "styled-components"
import { Link } from "gatsby"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { FlexEndColumn, StyledMiniList } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"
import useEarningsAndBalance from "./useEarningsAndBalance"

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 75px;
`

type ClaimedProps = {
  claimed: string
}

const Claimed: FunctionComponent<ClaimedProps> = ({ claimed }) => {
  const { ethBalance, balanceUSD } = useEarningsAndBalance()
  const sessionData = useCurrentSessionData()

  return (
    <FlexEndColumn>
      <div style={{ textAlign: "center" }}>
        <TitleContainer style={{ textAlign: "center", marginTop: "12px" }}>
          <Exa style={{ fontFamily: "Bluu Next" }}>You claimed {claimed}!</Exa>
        </TitleContainer>
        <Description>
          Congratulations degen, you've claimed your earnings 🍷
        </Description>
      </div>
      <StyledMiniList
        info={{
          "Abacus Balance": `${ethBalance} ETH ($${balanceUSD})`,
          "Appraised on": new Date(sessionData.endTime).toLocaleDateString(),
        }}
        isDark
      />
      <StyledButton buttonType={ButtonType.Gray} as={Link} to="/claim-pool">
        View Balance
      </StyledButton>
    </FlexEndColumn>
  )
}

export default Claimed
