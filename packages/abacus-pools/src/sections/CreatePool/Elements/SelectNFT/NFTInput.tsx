import React, { useCallback, useEffect, useMemo, useState } from "react"
import { InputError } from "@components/InputError"
import { OpenSeaAsset, openseaGet } from "@config/utils"
import styled from "styled-components"
import {
  Button,
  Mega,
  ButtonType,
  Remove,
  VisuallyHidden,
  Checkmark,
  Spinner,
  Error,
} from "abacus-ui"
import { usePrevious } from "@hooks/index"
import { StyledInput } from "../../CreatePool.styled"

const Container = styled.div<{ singular: boolean }>`
  background-color: ${({ singular, theme }) =>
    singular ? "transparent" : theme.colors.core.border};
  display: flex;
  flex-direction: column;
  padding: ${({ singular }) => (singular ? 0 : "16px")};
  gap: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`

const UpperContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const RemoveButton = styled(Button)`
  padding: 0;
`

const ValidateButton = styled(Button)`
  padding: 9px 20px;
`

type NFTInputProps = {
  singular: boolean
  nftAddress: string
  setNftAddress: (address: string) => void
  removeNftAddress: () => void
  removeDisabled: boolean
  index: number
  onValidate: ({
    address,
    tokenId,
    img,
    collectionTitle,
  }: {
    address: string
    tokenId: string
    img: string
    collectionTitle: string
  }) => void
}

enum Validated {
  NOT_CHECKED,
  VALID,
  IS_VALIDATING,
  INVALID,
}

const ICON_SIZE = 35

const NFTInput = ({
  singular,
  nftAddress,
  setNftAddress,
  removeNftAddress,
  removeDisabled,
  index,
  onValidate,
}: NFTInputProps) => {
  const [validated, setValidated] = useState(Validated.NOT_CHECKED)
  const previousNftAddress = usePrevious(nftAddress)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (nftAddress !== previousNftAddress) {
      setValidated(Validated.NOT_CHECKED)
    }
  }, [nftAddress, previousNftAddress])

  const validate = useCallback(async () => {
    setError(null)
    setValidated(Validated.IS_VALIDATING)
    try {
      const url = new URL(nftAddress)
      const splitPath = url.pathname.split("/")

      const address = splitPath[splitPath.length - 2]
      const tokenId = splitPath[splitPath.length - 1]

      const os = (await openseaGet(
        `asset/${address}/${tokenId}`
      )) as OpenSeaAsset

      if (os.asset_contract.schema_name !== "ERC721") {
        setError("The NFT must be a link to an ERC-721 NFT!")
        setValidated(Validated.INVALID)
        return
      }
      setValidated(Validated.VALID)
      onValidate({
        address,
        tokenId,
        img: os.image_url,
        collectionTitle: os.collection.name,
      })
    } catch (e) {
      setError("Invalid link")
      setValidated(Validated.INVALID)
    }
  }, [nftAddress, onValidate])

  const pill = useMemo(() => {
    switch (validated) {
      case Validated.IS_VALIDATING:
        return <Spinner size={ICON_SIZE} />
      case Validated.INVALID:
        return <Error size={ICON_SIZE} />
      case Validated.VALID:
        return <Checkmark size={ICON_SIZE} />
      default:
        return (
          <ValidateButton disabled={!nftAddress} onClick={() => validate()}>
            Validate
          </ValidateButton>
        )
    }
  }, [nftAddress, validate, validated])

  return (
    <Container singular={singular}>
      {!singular && (
        <UpperContainer>
          <Mega style={{ fontSize: 20 }}>#{index + 1}</Mega>
          <RemoveButton
            onClick={removeNftAddress}
            buttonType={ButtonType.Clear}
            disabled={removeDisabled}
          >
            <Remove />
            <VisuallyHidden>Remove Address #{index + 1}</VisuallyHidden>
          </RemoveButton>
        </UpperContainer>
      )}
      <StyledInput
        type="text"
        name="nft_address"
        value={nftAddress}
        onChange={setNftAddress}
        label="NFT Address"
        placeholder="Copy/Paste NFT Address"
        pill={pill}
        hint={error && <InputError>{error}</InputError>}
      />
    </Container>
  )
}

export { NFTInput }
