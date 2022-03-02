import React, { FunctionComponent, useState } from "react"
import Button from "@components/Button"
import { Tooltip } from "shards-react"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { useOnExitPool } from "@hooks/vaultFunc"
import { navigate } from "@reach/router"
import { ButtonContainer, VerticalContainer } from "../Pool.styles"

const ManagePool: FunctionComponent = () => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH
  const poolData = useGetPoolData()
  const { onExitPool, isPending } = useOnExitPool()
  const [isAuction, setIsAuction] = useState(false)

  return (
    <>
      <VerticalContainer style={{ marginTop: 10, alignItems: "center" }}>
        <ButtonContainer style={{ width: "100%" }}>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() => {
              setIsAuction(true)
              return onExitPool(poolData.vaultAddress, false, () => {
                alert("The auction has begun!")
              })
            }}
          >
            {isPending && isAuction ? "Loading..." : "Trigger Auction"}
          </Button>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() => {
              setIsAuction(false)
              return onExitPool(poolData.vaultAddress, true, () => {
                alert("The pool has been closed!")
                navigate("/")
              })
            }}
          >
            {isPending && !isAuction
              ? "Loading..."
              : `Exit Position (Pay ${
                  Number(poolData.exitFeeStatic) <
                  Number(poolData.exitFeePercentage) *
                    Number(poolData.tokensLocked) *
                    Number(poolData.tokenPrice)
                    ? poolData.exitFeeStatic
                    : Number(poolData.exitFeePercentage) *
                      Number(poolData.tokensLocked) *
                      Number(poolData.tokenPrice)
                } ETH)`}
          </Button>
        </ButtonContainer>
        {/*<ButtonContainer style={{ width: "100%" }}>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH}
            style={{ width: "100%", borderRadius: 5 }}
            type="submit"
          >
            End Auction
          </Button>
            </ButtonContainer>*/}
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

export default ManagePool
