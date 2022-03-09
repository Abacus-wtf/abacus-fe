import React, { useState } from "react"
import Button from "@components/Button"
import { Tooltip } from "shards-react"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { useOnExitPool, useOnStartEmissions } from "@hooks/vaultFunc"
import { ButtonContainer, VerticalContainer } from "../Pool.styles"
import { StateComponent } from "./index"

const ManagePool = ({ refresh }: StateComponent) => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH
  const poolData = useGetPoolData()
  const { onExitPool, isPending } = useOnExitPool()
  const { onStartEmissions, isPending: isPendingStartEmissions } =
    useOnStartEmissions()
  const [isAuction, setIsAuction] = useState(false)

  return (
    <>
      <VerticalContainer style={{ marginTop: 10, alignItems: "center" }}>
        <ButtonContainer style={{ width: "100%" }}>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH || (isPending && isAuction)}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() => {
              setIsAuction(true)
              return onExitPool(poolData.vaultAddress, false, async () => {
                await refresh()
              })
            }}
          >
            {isPending && isAuction ? "Loading..." : "Trigger Auction"}
          </Button>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH || (isPending && !isAuction)}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() => {
              setIsAuction(false)
              return onExitPool(poolData.vaultAddress, true, () => {
                refresh()
              })
            }}
          >
            {isPending && !isAuction ? "Loading..." : `Exit Position`}
          </Button>
        </ButtonContainer>
        <ButtonContainer style={{ width: "100%" }}>
          <Button
            className="notConnected"
            disabled={
              !isNetworkSymbolETH ||
              poolData.emissionsStarted ||
              isPendingStartEmissions
            }
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() =>
              onStartEmissions(() => {
                refresh()
              })
            }
          >
            {isPendingStartEmissions ? "Loading..." : `Start Emissions`}
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

export default ManagePool
