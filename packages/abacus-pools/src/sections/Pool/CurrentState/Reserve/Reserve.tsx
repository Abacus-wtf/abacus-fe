import { LoadingOverlay } from "@components/LoadingOverlay"
import { NFTImage } from "@components/NFTImage"
import { useOnReserve } from "@hooks/vaultFunc"
import {
  useGetPoolData,
  usePoolCurrentEpoch,
  usePoolReserve,
  useSetReserve,
} from "@state/singlePoolData/hooks"
import { Button, Flex, Input, Mega, P, Select } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

type ReserveProps = {
  refreshPoolData: () => void
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const StyledNftImage = styled(NFTImage)`
  max-width: 200px;
`

const Reserve = ({ refreshPoolData }: ReserveProps) => {
  const { nfts, vaultAddress } = useGetPoolData()
  const { onReserve, isPending } = useOnReserve()
  const ownedNfts = nfts.filter((nft) => nft.isManager)
  const [endEpoch, setEndEpoch] = useState("")
  const currentEpoch = usePoolCurrentEpoch()
  const maxEndEpoch = currentEpoch + 11

  const [selectedNft, setSelectedNft] = useState<typeof nfts[number]>(null)
  const setReserve = useSetReserve()
  const reserve = usePoolReserve()

  useEffect(() => {
    if (ownedNfts && ownedNfts.length) {
      setSelectedNft(ownedNfts[0])
    }
  }, [ownedNfts])

  useEffect(() => {
    if (vaultAddress && selectedNft && Number(endEpoch) > 0) {
      setReserve(
        vaultAddress,
        selectedNft.address,
        Number(selectedNft.tokenId),
        Number(endEpoch)
      )
    }
  }, [endEpoch, selectedNft, setReserve, vaultAddress])

  const buttonDisabled =
    !selectedNft || !endEpoch || !reserve || !reserve.totalAvailable

  return (
    <Container>
      <LoadingOverlay loading={isPending} />
      <Mega>NFT to Reserve</Mega>
      <Flex style={{ gap: "16px", alignItems: "flex-end" }}>
        <StyledNftImage src={selectedNft?.img} alt={selectedNft?.alt} />
        <Select
          value={selectedNft?.name ?? ""}
          setValue={(nextNftName) => {
            const nextNft = ownedNfts.find(
              (nft) => nft.name.toLowerCase() === nextNftName.toLowerCase()
            )
            setSelectedNft(nextNft)
          }}
          options={ownedNfts.map((nft) => nft.name)}
        />
      </Flex>
      <Flex style={{ flexDirection: "column", gap: "16px" }}>
        <Input
          label="End Epoch"
          name="end_epoch"
          value={endEpoch}
          onChange={setEndEpoch}
          type="number"
          step="1"
          min={currentEpoch}
          max={maxEndEpoch}
        />
      </Flex>
      <Flex style={{ flexDirection: "column", gap: "16px" }}>
        <Mega>Reservations Available</Mega>
        <P>{reserve ? `${reserve.totalAvailable} / ${reserve.total}` : "-"}</P>
        <Mega>Cost to Reserve</Mega>
        <P>{reserve ? formatEther(reserve.costToReserve) : "-"} ETH</P>
      </Flex>
      <Button
        disabled={buttonDisabled}
        onClick={() =>
          onReserve(
            selectedNft.address,
            Number(selectedNft.tokenId),
            Number(endEpoch),
            reserve.costToReserve,
            () => {
              refreshPoolData()
            }
          )
        }
      >
        Reserve
      </Button>
    </Container>
  )
}

export { Reserve }
