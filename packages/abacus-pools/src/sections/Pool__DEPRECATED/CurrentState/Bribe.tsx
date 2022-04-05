import React, { useCallback, useEffect, useState } from "react"
import Button from "@components/Button"
import { Tooltip } from "shards-react"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum, web3 } from "@config/constants"
import {
  useBribeData,
  useGetBribeData,
  useGetPoolData,
} from "@state/singlePoolData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { NumericalInput } from "@components/Input"
import { formatEther } from "ethers/lib/utils"
import { useOnAddToBribe, useWithdrawBribe } from "@hooks/bribeFunc"
import { ButtonContainer, VerticalContainer } from "../Pool.styles"
import { StateComponent } from "./index"
import { Stat } from "./CurrentState.styles"
import {
  InputContainer,
  BORDER,
  LabelRow,
  BalanceContainer,
  TinyTitles,
  MaxButton,
} from "./AMM.styles"

const Bribe = ({ refresh }: StateComponent) => {
  const { account } = useActiveWeb3React()
  const getBribeData = useGetBribeData()
  const bribeData = useBribeData()
  const { onWithdrawBribe, isPending: isPendingWithdraw } = useWithdrawBribe()
  const { onAddToBribe, isPending: isPendingAdd } = useOnAddToBribe()
  const [ethBalance, setEthBalance] = useState(null)
  const [input, setInput] = useState("")
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH
  const poolData = useGetPoolData()

  const getBalance = useCallback(async () => {
    const provider = web3(networkSymbol)
    const balance = await provider.eth.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }, [account, networkSymbol])

  useEffect(() => {
    if (ethBalance === null) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance])

  useEffect(() => {
    getBribeData()
  }, [account, getBribeData, poolData])

  if (!bribeData) {
    return <div style={{ width: "100%", textAlign: "center" }}>Loading...</div>
  }

  return (
    <>
      <VerticalContainer style={{ alignItems: "center" }}>
        <Stat
          title="Current Bribe Offered:"
          value={bribeData.offeredBribeSize}
        />
        {account && (
          <Stat
            title="Your Bribe Submitted"
            value={bribeData.bribeOfferedByUser}
          />
        )}
        <InputContainer
          style={{
            border: BORDER,
            borderRadius: 15,
            width: "100%",
          }}
        >
          <LabelRow>
            <BalanceContainer>
              <TinyTitles>Balance: {ethBalance} ETH</TinyTitles>
            </BalanceContainer>
          </LabelRow>
          <LabelRow>
            <BalanceContainer>
              <NumericalInput
                placeholder="0.0"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              />
              <MaxButton
                onClick={() => {
                  setInput(`${ethBalance}`)
                }}
              >
                MAX
              </MaxButton>
            </BalanceContainer>
          </LabelRow>
        </InputContainer>
        <ButtonContainer
          style={{ width: "100%", gridTemplateColumns: "1fr 1fr" }}
        >
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH || isPendingAdd || input === ""}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() =>
              onAddToBribe(input, async () => {
                await refresh()
                setInput("")
              })
            }
          >
            {isPendingAdd ? "Loading..." : "Add to Bribe"}
          </Button>
          <Button
            className="notConnected"
            disabled={
              !isNetworkSymbolETH ||
              isPendingWithdraw ||
              bribeData.bribeOfferedByUser === 0
            }
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() =>
              onWithdrawBribe(input, async () => {
                await refresh()
                setInput("")
              })
            }
          >
            {isPendingWithdraw ? "Loading..." : "Withdraw Bribe"}
          </Button>
        </ButtonContainer>
        <Tooltip
          open={isToolTipOpen}
          target=".notConnected"
          disabled={isNetworkSymbolETH}
          toggle={() => setIsToolTipOpen(!isToolTipOpen)}
          placement="bottom"
        >
          {!isNetworkSymbolETH &&
            "Your wallet is not connected or you are on the wrong network!"}
        </Tooltip>
      </VerticalContainer>
    </>
  )
}

export default Bribe
