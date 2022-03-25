import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import {
  Modal,
  H2,
  Button,
  ButtonType,
  Input,
  ETH,
  Kilo,
  Close,
  VisuallyHidden,
  Media,
} from "abacus-ui"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { useOnDepositPrincipal } from "@hooks/claim-pool"

type DepositModalProps = {
  isOpen: boolean
  closeModal: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  margin-bottom: 26px;
`

const StyledH2 = styled(H2)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 0 28px;
`

const CloseButton = styled(Button)`
  padding: 6px;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`

const BalanceContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 60px;

  ${Kilo} {
    color: ${({ theme }) => theme.colors.core["800"]};

    &:first-of-type {
      font-weight: bold;
    }
  }

  ${Media.sm`
    min-width: 500px;
  `}
`

const BalanceIconContainer = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`

const Error = styled(Kilo)`
  color: ${({ theme }) => theme.colors.utility.red};
  & pre {
    display: inline-block;
  }
`

const DepositModal: FunctionComponent<DepositModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [ethValue, setEthValue] = useState("")
  const claimPayout = useClaimPayoutData()
  const {
    onDeposit,
    isPending: isPendingDeposit,
    txError,
  } = useOnDepositPrincipal()

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <Header>
          <StyledH2>Deposit Funds</StyledH2>
          <CloseButton
            buttonType={ButtonType.Clear}
            type="button"
            onClick={closeModal}
          >
            <Close />
            <VisuallyHidden>Close Deposit Funds Modal</VisuallyHidden>
          </CloseButton>
        </Header>
        {txError && (
          <Error>
            Error from wallet: <pre>{txError}</pre>
          </Error>
        )}
        <Input
          value={ethValue}
          onChange={setEthValue}
          name="deposit_funds"
          type="number"
          label="ETH"
          placeholder="69.420"
          hint={ethValue && `${ethValue} ETH`}
        />
        <BalanceContainer>
          <BalanceIconContainer>
            <ETH />
          </BalanceIconContainer>
          <div>
            <Kilo>Abacus Balance</Kilo>
            <Kilo>{claimPayout?.ethCredit ?? 0} ETH</Kilo>
          </div>
        </BalanceContainer>
        <StyledButton
          onClick={() => onDeposit(ethValue)}
          disabled={!ethValue || isPendingDeposit}
        >
          Deposit Funds
        </StyledButton>
      </Container>
    </Modal>
  )
}

export default DepositModal
