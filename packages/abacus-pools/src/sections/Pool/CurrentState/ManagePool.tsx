import React, { useState } from "react"
import Button from "@components/Button"
import { Tooltip } from "shards-react"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { useOnExitPool, useOnStartEmissions } from "@hooks/vaultFunc"
import { useAcceptBribe } from "@hooks/bribeFunc"
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
  const { onAcceptBribe, isPending: isPendingAcceptBribe } = useAcceptBribe()
  const [isAuction, setIsAuction] = useState(false)

  return (
    <>
      <VerticalContainer style={{ marginTop: 10, alignItems: "center" }}>
        <ButtonContainer
          style={{ width: "100%", gridTemplateColumns: "1fr 1fr" }}
        >
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH || (isPending && isAuction)}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() => {
              setIsAuction(true)
              return onExitPool(poolData.vaultAddress, async () => {
                await refresh()
              })
            }}
          >
            {isPending && isAuction ? "Loading..." : "Trigger Auction"}
          </Button>
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
        <ButtonContainer>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH || isPendingAcceptBribe}
            style={{ width: "100%", borderRadius: 5 }}
            onClick={() =>
              onAcceptBribe(async () => {
                await refresh()
              })
            }
          >
            {isPendingAcceptBribe ? "Loading..." : "Accept Bribes"}
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
