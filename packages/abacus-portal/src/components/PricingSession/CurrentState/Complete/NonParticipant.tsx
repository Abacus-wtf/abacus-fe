import React, { FunctionComponent } from "react"
import { Exa, MiniList } from "abacus-ui"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { isWithinWinRange } from "@config/utils"
import {
  TitleContainer,
  VerticallyCenteredContainer,
} from "../CurrentState.styled"

const NonParticipant: FunctionComponent = () => {
  const sessionData = useCurrentSessionData()

  const { winners, losers } = sessionData?.rankings.reduce(
    (acc, ranking) =>
      isWithinWinRange(
        Number(ranking.appraisal),
        sessionData.finalAppraisalValue,
        sessionData.winnerAmount
      )
        ? { ...acc, winners: acc.winners + 1 }
        : { ...acc, losers: acc.losers + 1 },
    {
      winners: null,
      losers: null,
    }
  ) ?? { winners: null, losers: null }

  return (
    <VerticallyCenteredContainer>
      <TitleContainer style={{ textAlign: "center" }}>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {`This NFT was appraised at ${sessionData.finalAppraisalValue} ETH`}
        </Exa>
      </TitleContainer>
      <MiniList
        info={{
          Winners: winners,
          Losers: losers,
          "Appraised on": new Date(sessionData.endTime).toLocaleDateString(),
        }}
        isDark
      />
    </VerticallyCenteredContainer>
  )
}

export default NonParticipant
