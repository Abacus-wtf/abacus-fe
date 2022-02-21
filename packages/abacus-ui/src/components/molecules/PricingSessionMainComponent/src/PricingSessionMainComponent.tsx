import {
  Button,
  ButtonType,
  CardBackground,
  Input,
  MiniList,
  SessionCountdown,
} from "@atoms";
import { ExploreCardProps } from "@molecules";
import { Exa, Kilo } from "@typography";
import { SessionState } from "components/molecules/ExploreScrollableCard/src/ExploreScrollableCard";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Lock from "../../../../static/lock.svg";
import EthLogo from "../../../../static/eth_logo.svg";

const LeftHalf = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 20px;
`;

const RightHalf = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 20px;
`;

const Image = styled.img`
  height: 321px;
  width: 321px;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`;

const CountdownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`;

const Description = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[800]};
`;

const BottomButtonContainer = styled.div`
  grid-gap: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const LockOuterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const LockContainer = styled.div`
  display: flex;
  grid-gap: 18px;
  padding-left: 10px;
  align-items: center;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

type PricingSessionMainComponentProps = {
  currentState: SessionState;
  participation?: {
    appraisal: number;
    stake: number;
    seedNumber: string;
  };
  cardInfo: ExploreCardProps;
  currentEthBalance: number;
  openDepositModal: () => void;
  onMainClick: () => void;
};

const PricingSessionMainComponent: FunctionComponent<PricingSessionMainComponentProps> =
  ({
    currentState,
    cardInfo,
    currentEthBalance,
    openDepositModal,
    onMainClick,
    participation,
  }) => {
    const [pageState, setPageState] = useState(0);
    const [appraisal, setAppraisal] = useState("");
    const [stake, setStake] = useState("");
    return (
      <CardBackground style={{ padding: "48px 84px", gridGap: 84 }}>
        <>
          <LeftHalf>
            <Image src={cardInfo.nftSrc} />
            <CountdownContainer>
              <SessionCountdown endTime={cardInfo.endTime} />
            </CountdownContainer>
          </LeftHalf>
          <RightHalf>
            {currentState === SessionState.Vote ? (
              <>
                <TitleContainer>
                  <Exa style={{ fontFamily: "Bluu Next" }}>
                    {pageState === 0
                      ? "What's your appraisal?"
                      : "Stake your bet"}
                  </Exa>
                  <Description>
                    {pageState === 0
                      ? "How much do you think this NFT is worth?"
                      : "How much would you like to stake?"}
                  </Description>
                </TitleContainer>
                {participation === undefined ? (
                  <Input
                    showEth
                    name="Amount"
                    type="text"
                    value={pageState === 0 ? appraisal : stake}
                    onChange={(value) =>
                      pageState === 0 ? setAppraisal(value) : setStake(value)
                    }
                    placeholder={
                      pageState === 0 ? "Appraisal Amount" : "Stake Amount"
                    }
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
                  {participation === undefined ? (
                    <>
                      <LockOuterContainer>
                        <LockContainer>
                          <img
                            style={{ width: pageState === 0 ? 24 : 35 }}
                            src={pageState === 0 ? Lock : EthLogo}
                            alt={pageState === 0 ? "Lock" : "Ethereum Logo"}
                          />
                          <TitleContainer style={{ gridGap: 1 }}>
                            <Description style={{ fontWeight: 600 }}>
                              {pageState === 0
                                ? "Private until you reveal"
                                : "Abacus Balance"}
                            </Description>
                            <Description>
                              {pageState === 0
                                ? "Appraisals are anonymous until all submissions are in."
                                : `${currentEthBalance} ETH`}
                            </Description>
                          </TitleContainer>
                        </LockContainer>
                        {pageState !== 0 ? (
                          <Button
                            onClick={() => openDepositModal()}
                            buttonType={ButtonType.White}
                          >
                            Deposit Funds
                          </Button>
                        ) : null}
                      </LockOuterContainer>
                      {pageState === 0 ? (
                        <FullWidthButton
                          onClick={() =>
                            appraisal !== "" ? setPageState(1) : null
                          }
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
                          <FullWidthButton onClick={() => onMainClick()}>
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
                        <FullWidthButton onClick={() => onMainClick()}>
                          Edit Appraisal
                        </FullWidthButton>
                      </TitleContainer>
                    </>
                  )}
                </BottomButtonContainer>
              </>
            ) : null}
          </RightHalf>
        </>
      </CardBackground>
    );
  };

export default PricingSessionMainComponent;
