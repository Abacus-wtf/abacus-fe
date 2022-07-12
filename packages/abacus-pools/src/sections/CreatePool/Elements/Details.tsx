import React, { FunctionComponent } from "react"
import { useOnBeginPool } from "@hooks/createPool"
import { NFTGrid, LoadingOverlay, NFTImage } from "@components/index"
import { StyledButton, Title } from "../CreatePool.styled"
import { CreatePoolState } from "../models"
import { NewAddress } from "../CreatePool"

type DetailsProps = {
  nfts: NewAddress[]
  vaultAddress: string
  maxCollateralAmount: number
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
}

export const Details: FunctionComponent<DetailsProps> = ({
  nfts,
  vaultAddress,
  maxCollateralAmount,
  setCreatePoolState,
}) => {
  const { onBeginPool, isPending } = useOnBeginPool()

  const beginPool = async () => {
    onBeginPool(vaultAddress, maxCollateralAmount, () => {
      setCreatePoolState(CreatePoolState.Complete)
    })
  }

  return (
    <>
      <LoadingOverlay loading={isPending} />
      <Title>Begin Pool</Title>
      <NFTGrid size={nfts.length}>
        {nfts.map((nft) => (
          <NFTImage key={nft.id} src={nft.img} alt={nft.collectionTitle} />
        ))}
      </NFTGrid>

      <StyledButton onClick={beginPool} disabled={isPending}>
        {isPending ? "Beginning Pool..." : "Begin Pool"}
      </StyledButton>
    </>
  )
}
