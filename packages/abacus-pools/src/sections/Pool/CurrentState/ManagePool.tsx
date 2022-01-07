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
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE
  const poolData = useGetPoolData()

  return (
    <>
      <VerticalContainer style={{ marginTop: 10, alignItems: "center" }}>
        <ButtonContainer style={{ width: "100%" }}>
          <Button
            disabled={isNetworkSymbolNone}
            style={{ width: "100%", borderRadius: 5 }}
            type="submit"
          >
            Trigger Auction
          </Button>
          <Button
            disabled={isNetworkSymbolNone}
            style={{ width: "100%", borderRadius: 5 }}
            type="submit"
          >
            Exit Position (Pay {poolData.exitFee}% of Total)
          </Button>
        </ButtonContainer>
        <Tooltip
          open={isToolTipOpen}
          target="#notConnected"
          disabled={isNetworkSymbolNone}
          toggle={() => setIsToolTipOpen(!isToolTipOpen)}
          placement="right"
        >
          {isNetworkSymbolNone &&
            "Your wallet is not connected or you are on the wrong network!"}
        </Tooltip>
      </VerticalContainer>
    </>
  )
}

export default ManagePool
