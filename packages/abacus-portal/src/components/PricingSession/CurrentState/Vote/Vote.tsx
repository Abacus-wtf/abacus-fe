import React, { FunctionComponent, useEffect, useState, useMemo } from "react"
import { Button, ButtonType, Input, MiniList, Exa, Lock, ETH } from "abacus-ui"
import { useOnSubmitVote, useOnUpdateVote } from "@hooks/current-session"
import { genRanHex, hashValues } from "@config/utils"
import { parseEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { BigNumber } from "ethers"
import useParticipation from "../useParticipation"
import useValidate, { ValidationFn } from "../useValidate"
import SeedNumber from "./SeedNumber"
import {
  TitleContainer,
  Description,
  InputError,
  BottomButtonContainer,
  LockOuterContainer,
  LockContainer,
  FullWidthButton,
} from "../CurrentState.styled"

type VoteProps = {
  openDepositModal: () => void
}

const MIN_STAKE = 0.009

enum PageState {
  APPRAISAL,
  STAKE,
  SUBMITTED,
}

const Vote: FunctionComponent<VoteProps> = ({ openDepositModal }) => {
  const { account } = useActiveWeb3React()
  const [pageState, setPageState] = useState(PageState.APPRAISAL)
  const [appraisal, setAppraisal] = useState("")
  const [inputHint, setInputHint] = useState("")
  const [inputError, setInputError] = useState("")
  const sessionData = useCurrentSessionData()
  const [password, setPassword] = useState(`0x${genRanHex(20)}`)
  const [stake, setStake] = useState("")
  const { participation } = useParticipation()
  const { onSubmitVote, isPending: submitVotePending } = useOnSubmitVote()
  const { onUpdateVote, isPending: updateVotePending } = useOnUpdateVote()
  const claimPayout = useClaimPayoutData()

  const { maxAppraisal } = sessionData
  const ethCredit = claimPayout?.ethCredit ?? 0

  const appraisalChecks: ValidationFn<string>[] = useMemo(
    () => [
      (a) =>
        Number(a) >= maxAppraisal
          ? {
              valid: false,
              message: `Max Appraisal is ${maxAppraisal}`,
            }
          : { valid: true },
      (a) => {
        if (a.indexOf(".") !== -1) {
          const numDecimals = a.split(".")[1].length
          if (numDecimals > 11) {
            return {
              valid: false,
              message: "Must be less than 11 decimal places",
            }
          }
        }
        return { valid: true }
      },
    ],
    [maxAppraisal]
  )

  const stakeChecks: ValidationFn<string>[] = useMemo(
    () => [
      (s) =>
        Number(s) > Number(ethCredit)
          ? {
              valid: false,
              message: `Insufficent funds. Deposit some funds here! 👇`,
            }
          : { valid: true },
      (s) =>
        Number(s) < MIN_STAKE
          ? {
              valid: false,
              message: `Min stake is ${MIN_STAKE} ETH. You tried staking ${s} Ether. Keep in mind that 0.002 Ether is used for the Bounty tax and 0.002 Ether is used for the Keepers tax.`,
            }
          : { valid: true },
    ],
    [ethCredit]
  )
  const appraisalValid = useValidate(appraisal, appraisalChecks)
  const stakeValid = useValidate(stake, stakeChecks)

  const submitVote = async () => {
    const hash = hashValues({
      appraisalValue: parseEther(`${appraisal}`),
      account: account || "",
      password: !password.startsWith("0x")
        ? Number(password)
        : BigNumber.from(password),
    })

    try {
      await onSubmitVote(password, appraisal, stake, hash)
    } catch (e) {
      console.log(e)
    }
  }

  const updateVote = async () => {
    const hash = hashValues({
      appraisalValue: parseEther(`${appraisal}`),
      account: account || "",
      password: !password.startsWith("0x")
        ? Number(password)
        : BigNumber.from(password),
    })

    try {
      await onUpdateVote(password, appraisal, hash)
    } catch (e) {
      // console.log(e)
    }
  }

  useEffect(() => {
    if (pageState === 0) {
      setInputHint(appraisal ? `${appraisal} ETH` : "Appraisal required")
    } else {
      setInputHint(stake ? `${stake} ETH` : "Stake required")
    }
    if (appraisalValid.valid && stakeValid.valid) {
      setInputError("")
    } else {
      if (!appraisalValid.valid) {
        setInputError(appraisalValid.message)
      }
      if (!stakeValid.valid) {
        setInputError(stakeValid.message)
      }
    }
  }, [appraisal, pageState, stake, appraisalValid, stakeValid])

  useEffect(() => {
    if (participation) {
      setPageState(PageState.SUBMITTED)
      setPassword(participation?.password)
    }
  }, [participation])

  const notLoggedIn = !account

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
      {pageState !== PageState.SUBMITTED ? (
        <Input
          label="ETH"
          name="Amount"
          type="number"
          value={pageState === PageState.APPRAISAL ? appraisal : stake}
          onChange={(value) =>
            pageState === PageState.APPRAISAL
              ? setAppraisal(value)
              : setStake(value)
          }
          placeholder={
            pageState === PageState.APPRAISAL
              ? "Appraisal Amount"
              : "Stake Amount"
          }
          hint={
            <>
              {inputHint}
              {inputError && (
                <>
                  {" "}
                  • <InputError>{inputError}</InputError>
                </>
              )}
            </>
          }
          disabled={
            notLoggedIn ||
            (Boolean(participation) && pageState === PageState.STAKE)
          }
        />
      ) : (
        <>
          <MiniList
            info={{
              Appraisal: `${participation?.appraisal} ETH`,
              Stake: `${participation?.stake} ETH`,
              "Seed Number": <SeedNumber />,
            }}
            isDark
          />
        </>
      )}
      <BottomButtonContainer>
        {pageState !== PageState.SUBMITTED ? (
          <>
            <LockOuterContainer>
              <LockContainer>
                {pageState === PageState.APPRAISAL ? <Lock /> : <ETH />}
                <TitleContainer style={{ gridGap: 1 }}>
                  <Description style={{ fontWeight: 600 }}>
                    {pageState === PageState.APPRAISAL
                      ? "Private until you reveal"
                      : "Abacus Balance"}
                  </Description>
                  <Description>
                    {pageState === PageState.APPRAISAL
                      ? "Appraisals are anonymous until all submissions are in."
                      : `${claimPayout?.ethCredit ?? 0} ETH`}
                  </Description>
                </TitleContainer>
              </LockContainer>
              {pageState !== PageState.APPRAISAL ? (
                <Button
                  onClick={openDepositModal}
                  buttonType={ButtonType.White}
                  disabled={notLoggedIn}
                >
                  Deposit Funds
                </Button>
              ) : null}
            </LockOuterContainer>
            {pageState === PageState.APPRAISAL ? (
              <FullWidthButton
                onClick={() => setPageState(PageState.STAKE)}
                disabled={notLoggedIn || !appraisal || !appraisalValid.valid}
              >
                Appraise
              </FullWidthButton>
            ) : (
              <TitleContainer style={{ flexDirection: "row" }}>
                <Button
                  buttonType={ButtonType.Gray}
                  onClick={() => setPageState(PageState.APPRAISAL)}
                  disabled={notLoggedIn}
                >
                  Back
                </Button>
                <FullWidthButton
                  onClick={participation ? updateVote : submitVote}
                  disabled={
                    notLoggedIn ||
                    !stake ||
                    !stakeValid.valid ||
                    submitVotePending
                  }
                >
                  {submitVotePending || updateVotePending
                    ? "Submitting"
                    : participation
                    ? "Update"
                    : "Submit Stake"}
                </FullWidthButton>
              </TitleContainer>
            )}
          </>
        ) : (
          <>
            <TitleContainer style={{ flexDirection: "row" }}>
              <FullWidthButton
                buttonType={ButtonType.Gray}
                disabled={notLoggedIn}
              >
                Add to Bounty
              </FullWidthButton>
              <FullWidthButton
                onClick={() => setPageState(PageState.APPRAISAL)}
                disabled={updateVotePending || notLoggedIn}
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
