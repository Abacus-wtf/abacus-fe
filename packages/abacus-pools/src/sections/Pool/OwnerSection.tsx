import { LoadingOverlay } from "@components/LoadingOverlay"
import { ABC_BRIBE_FACTORY } from "@config/constants"
import { useAcceptBribe } from "@hooks/bribeFunc"
import { useOnApproveTransfer, useOnStartEmissions } from "@hooks/vaultFunc"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Button, ButtonType, Kilo, Section } from "abacus-ui"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const SectionStyled = styled(Section)`
  border: 1px solid #f33636;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`

const StyledButton = styled(Button)`
  width: 100%;
`

interface OwnerSectionProps {
  refreshPoolData: () => void
}

const OwnerSection = ({ refreshPoolData }: OwnerSectionProps) => {
  const { address, tokenId, nonce, approvedBribeFactory, emissionsStarted } =
    useGetPoolData()
  const { onStartEmissions, isPending: isPendingStartEmissions } =
    useOnStartEmissions()
  const { onAcceptBribe, isPending: isPendingAcceptBribe } = useAcceptBribe()
  const { onApproveTransfer, isPending: isPendingApproval } =
    useOnApproveTransfer()
  return (
    <SectionStyled>
      <LoadingOverlay
        loading={
          isPendingStartEmissions || isPendingAcceptBribe || isPendingApproval
        }
      />
      <SectionHeader>
        <SectionTitle>Owner Section</SectionTitle>
      </SectionHeader>
      <Kilo style={{ marginTop: 8, marginBottom: 10 }}>
        Proceed with caution, the following actions are irreversible:
      </Kilo>
      <ButtonContainer>
        <Link
          to={`/close-pool?address=${address}&tokenId=${tokenId}&nonce=${nonce}`}
        >
          <StyledButton buttonType={ButtonType.Gray}>Close Pool</StyledButton>
        </Link>
        <StyledButton
          onClick={() =>
            onStartEmissions(async () => {
              await refreshPoolData()
            })
          }
          buttonType={ButtonType.Gray}
          disabled={emissionsStarted || isPendingStartEmissions}
        >
          {emissionsStarted
            ? "Emissions Started"
            : isPendingStartEmissions
            ? "Loading..."
            : "Start Emissions"}
        </StyledButton>
      </ButtonContainer>
      <StyledButton
        onClick={() => {
          if (!approvedBribeFactory) {
            onApproveTransfer(ABC_BRIBE_FACTORY, async () => {
              await refreshPoolData()
            })
          } else {
            onAcceptBribe(async () => {
              await refreshPoolData()
            })
          }
        }}
        disabled={isPendingAcceptBribe || isPendingApproval}
        buttonType={ButtonType.Gray}
      >
        {isPendingAcceptBribe || isPendingApproval
          ? "Loading..."
          : !approvedBribeFactory
          ? "Approve Bribe Factory"
          : "Accept Bribes"}
      </StyledButton>
    </SectionStyled>
  )
}

export default OwnerSection
