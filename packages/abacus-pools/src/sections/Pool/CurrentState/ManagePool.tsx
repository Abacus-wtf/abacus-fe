import React, { FunctionComponent, useState } from "react"
import Button from "@components/Button"
import { Tooltip } from "shards-react"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { ButtonContainer, VerticalContainer } from "../Pool.styles"

const ManagePool: FunctionComponent = () => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH
  const poolData = useGetPoolData()

  return (
    <>
      <VerticalContainer style={{ marginTop: 10, alignItems: "center" }}>
        <ButtonContainer style={{ width: "100%" }}>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH}
            style={{ width: "100%", borderRadius: 5 }}
            type="submit"
          >
            Trigger Auction
          </Button>
          <Button
            className="notConnected"
            disabled={!isNetworkSymbolETH}
            style={{ width: "100%", borderRadius: 5 }}
            type="submit"
          >
            Exit Position (Pay {poolData.exitFee}% of Total)
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
