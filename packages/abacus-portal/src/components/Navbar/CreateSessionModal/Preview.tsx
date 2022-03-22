import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { openseaGet } from "@config/utils"
import {
  AbacusBalance,
  Button,
  ExploreImage,
  MiniList,
  SessionCountdown,
  ButtonType,
  H5,
  Media,
} from "abacus-ui"
import { useEthToUSD } from "@state/application/hooks"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { FormValues } from "./CreateSessionModal"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const ImageContainer = styled.div`
  width: 75%;
`

const StyledMiniList = styled(MiniList)`
  width: 100%;
  margin: 40px 0;
`

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 16px;
  margin-top: 8px;
  margin-bottom: 40px;

  ${Media.sm`
    flex-direction: row;
  `}
`

const StyledButton = styled(Button)`
  justify-self: center;
`

type PreviewProps = {
  formValues: FormValues
  createSession: () => Promise<void>
  isPendingCreateSession: boolean
}

const Preview: FunctionComponent<PreviewProps> = ({
  formValues,
  createSession,
  isPendingCreateSession,
}) => {
  const [asset, setAsset] = useState("")

  useEffect(() => {
    const loadData = async () => {
      const URL = `asset/${formValues.nftAddress}/${formValues.tokenId}`
      const result = await openseaGet(URL)
      setAsset(result.image_url)
    }
    if (formValues.nftAddress && formValues.tokenId) {
      loadData()
    }
  }, [formValues.nftAddress, formValues.tokenId])

  const initialBounty = Number(formValues.bounty) || 0
  const initialBountyUSD = useEthToUSD(initialBounty)
  const claimData = useClaimPayoutData()

  return (
    <Container>
      <ImageContainer>
        <ExploreImage imgSrc={asset} loading={!asset} />
      </ImageContainer>
      <SessionCountdown
        endTime={
          Number(formValues.votingTime) * 60 * 60 * 1000 + new Date().getTime()
        }
        loading={!asset}
      />
      <StyledMiniList
        info={{
          "Initial Bounty": `${initialBounty} ETH ($${initialBountyUSD})`,
          Visibility: "🌍 Public",
        }}
        isDark
      />
      <H5 style={{ justifySelf: "flex-start" }}>Abacus Balance</H5>
      <BalanceContainer>
        <AbacusBalance balance={claimData.ethCredit} />
        <StyledButton
          buttonType={ButtonType.White}
          as="a"
          href="/claim-pool"
          target="_blank"
        >
          Deposit Funds
        </StyledButton>
      </BalanceContainer>
      <Button
        style={{ marginTop: "16px", width: "100%" }}
        disabled={isPendingCreateSession}
        onClick={createSession}
      >
        Confirm and submit stake
      </Button>
    </Container>
  )
}

export default Preview
