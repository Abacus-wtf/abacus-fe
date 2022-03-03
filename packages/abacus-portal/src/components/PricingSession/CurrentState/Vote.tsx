import React, { FunctionComponent, useState } from "react"
import {
  Button,
  ButtonType,
  Input,
  MiniList,
  Exa,
  Kilo,
  ETH,
  Lock,
  Media,
} from "abacus-ui"
import styled from "styled-components"
import { useOnSubmitVote, useOnUpdateVote } from "@hooks/current-session"
import { hashValues } from "@config/utils"
import { parseEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import useParticipation from "./useParticipation"

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  text-align: center;

  ${Media.sm`
    text-align: left;
  `}
`

const Description = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[800]};
`

const BottomButtonContainer = styled.div`
  grid-gap: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const LockOuterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const LockContainer = styled.div`
  display: flex;
  grid-gap: 18px;
  padding-left: 10px;
  align-items: center;
`

const FullWidthButton = styled(Button)`
  width: 100%;
`

type VoteProps = {
  openDepositModal: () => void
}

const Vote: FunctionComponent<VoteProps> = ({ openDepositModal }) => {
  const { account } = useActiveWeb3React()
  const [pageState, setPageState] = useState(0)
  const [appraisal, setAppraisal] = useState("")
  const [inputHint, setInputHint] = useState("")
  const sessionData = useCurrentSessionData()
  const password = "WHYDONTWEASKFORTHISANYMORE?"
  const [stake, setStake] = useState("")
  const participation = useParticipation()
  const { onSubmitVote, isPending: submitVotePending } = useOnSubmitVote()
  const { onUpdateVote, isPending: updateVotePending } = useOnUpdateVote()
  const claimPayout = useClaimPayoutData()

  const validate = (): boolean => {
    const stakeAsNum = Number(stake)
    if (Number(appraisal) >= sessionData.maxAppraisal) {
      alert(
        `The Max Appraisal you can do is ${sessionData.maxAppraisal} Ether but you submitted ${appraisal} Ether.`
      )
      return false
    }

    if (stakeAsNum > Number(claimPayout?.ethCredit)) {
      alert(
        `You tried to stake with a higher number than your credit amount. To increase your credit amount, visit the 'Claim & Deposit' page!`
      )
      return false
    }

    if (stakeAsNum < 0.009) {
      alert(
        `The min amount of eth you can stake is .009 Ether. You tried staking ${stakeAsNum} Ether. Keep in mind that 0.002 Ether is used for the Bounty tax and 0.002 Ether is used for the Keepers tax.`
      )
      return false
    }

    if (appraisal.indexOf(".") !== -1) {
      const numDecimals = appraisal.split(".")[1].length
      if (numDecimals > 11) {
        alert(
          "Please use a appraisal value that has less than 11 decimal places."
        )
        return false
      }
    }
    return true
  }

  const submitVote = async () => {
    if (!stake) {
      setInputHint("Must set a stake value")
      return
    }
    if (validate()) {
      const hash = hashValues({
        appraisalValue: parseEther(`${appraisal}`),
        account: account || "",
        password,
        // password: !passwordVal.startsWith("0x")
        //   ? Number(passwordVal)
        //   : BigNumber.from(passwordVal),
      })

      console.log("hash", hash)

      await onSubmitVote(password, appraisal, stake, hash)
    }
  }

  const updateVote = async () => {
    if (validate()) {
      const hash = hashValues({
        appraisalValue: parseEther(`${appraisal}`),
        account: account || "",
        password,
        // password: !passwordVal.startsWith("0x")
        //   ? Number(passwordVal)
        //   : BigNumber.from(passwordVal),
      })

      await onUpdateVote(password, appraisal, hash)
    }
  }

  return (
    <>
      <TitleContainer>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {pageState === 0 ? "What's your appraisal?" : "Stake your bet"}
        </Exa>
        <Description>
          {pageState === 0
            ? "How much do you think this NFT is worth?"
            : "How much would you like to stake?"}
        </Description>
      </TitleContainer>
      {!participation ? (
        <Input
          label="ETH"
          name="Amount"
          type="number"
          value={pageState === 0 ? appraisal : stake}
          onChange={(value) =>
            pageState === 0 ? setAppraisal(value) : setStake(value)
          }
          placeholder={pageState === 0 ? "Appraisal Amount" : "Stake Amount"}
          hint={inputHint}
        />
      ) : (
        <>
          <MiniList
            info={{
              Appraisal: `${participation.appraisal} ETH`,
              Stake: `${participation.stake} ETH`,
              "Seed Number": participation.seedNumber,
            }}
            isDark
          />
        </>
      )}
      <BottomButtonContainer>
        {!participation ? (
          <>
            <LockOuterContainer>
              <LockContainer>
                {pageState === 0 ? <Lock /> : <ETH />}
                <TitleContainer style={{ gridGap: 1 }}>
                  <Description style={{ fontWeight: 600 }}>
                    {pageState === 0
                      ? "Private until you reveal"
                      : "Abacus Balance"}
                  </Description>
                  <Description>
                    {pageState === 0
                      ? "Appraisals are anonymous until all submissions are in."
                      : `${claimPayout?.ethCredit ?? 0} ETH`}
                  </Description>
                </TitleContainer>
              </LockContainer>
              {pageState !== 0 ? (
                <Button
                  onClick={openDepositModal}
                  buttonType={ButtonType.White}
                >
                  Deposit Funds
                </Button>
              ) : null}
            </LockOuterContainer>
            {pageState === 0 ? (
              <FullWidthButton
                onClick={() => {
                  if (appraisal !== "") {
                    setPageState(1)
                    setInputHint("")
                  } else {
                    setInputHint("Must set appraisal")
                  }
                }}
              >
                Appraise
              </FullWidthButton>
            ) : (
              <TitleContainer style={{ flexDirection: "row" }}>
                <Button
                  buttonType={ButtonType.Gray}
                  onClick={() => setPageState(0)}
                >
                  Back
                </Button>
                <FullWidthButton
                  onClick={submitVote}
                  disabled={submitVotePending}
                >
                  Submit Stake
                </FullWidthButton>
              </TitleContainer>
            )}
          </>
        ) : (
          <>
            <TitleContainer style={{ flexDirection: "row" }}>
              <FullWidthButton buttonType={ButtonType.Gray}>
                Add to Bounty
              </FullWidthButton>
              <FullWidthButton
                onClick={updateVote}
                disabled={updateVotePending}
              >
                Edit Appraisal
              </FullWidthButton>
            </TitleContainer>
          </>
        )}
      </BottomButtonContainer>
    </>
  )
}

export default Vote
