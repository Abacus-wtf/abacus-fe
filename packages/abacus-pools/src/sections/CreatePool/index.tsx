import React, { useState, FormEvent, useEffect } from "react"
import { Title, Subheader, UniversalContainer } from "@components/global.styles"
import { ListGroup, ListGroupItem, Form, Modal, ModalBody } from "shards-react"
import { InputWithTitle } from "@components/Input"
import Button from "@components/Button"
import styled from "styled-components"
import { useActiveWeb3React, useWeb3Contract } from "@hooks/index"
import { ABC_FACTORY } from "@config/constants"
import { OpenSeaAsset, openseaGet, shortenAddress } from "@config/utils"
import { theme } from "@config/theme"
import { NFT, NFTBasePool } from "@state/poolData/reducer"
import _ from "lodash"
import { useOnCreatePool } from "@hooks/createPool"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import {
  SplitContainer,
  VerticalSmallGapContainer,
  FileContainer,
  SubText as SubTitle,
} from "../Pool/Pool.styles"

const ListGroupStyled = styled(ListGroup)`
  margin: 45px 0px;

  @media ${theme.mediaMin.splitCenter} {
    min-width: 450px;
  }
`

const ModalSubtitle = styled(SubTitle)`
  color: ${theme.colors.accent};
  font-weight: bold;
`

const ModalTitle = styled(Title)`
  font-weight: bold;
  font-size: 1.2rem;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalPair = ({ title, value }: { title: string; value: string }) => (
  <div style={{ marginBottom: 10 }}>
    <ModalSubtitle>{title}</ModalSubtitle>
    <ModalTitle>{value}</ModalTitle>
  </div>
)

type CreatePoolForm<Elements> = Elements & {
  poolTokenName: HTMLInputElement
  poolTokenSymbol: HTMLInputElement
  exitFeePercentage: HTMLInputElement
  exitFeeStatic: HTMLInputElement
  openseaLink: HTMLInputElement
}

const CreatePool: React.FC = () => {
  const { account } = useActiveWeb3React()
  const factory = useWeb3Contract(FACTORY_ABI)
  const { onCreatePool } = useOnCreatePool()
  const [openModal, setOpenModal] = useState(false)
  const [newSesh, setNewSesh] = useState<NFTBasePool | null>(null)
  const [chosePool, setChosePool] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [nfts, setNFTs] = useState<NFT[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentNonce, setCurrentNonce] = useState(0)

  useEffect(() => {
    const loadNFTs = async () => {
      setIsLoading(true)
      const opensea = await openseaGet(`assets?owner=${account}`)
      const filteredAssets = _.filter(
        (opensea as { assets: OpenSeaAsset[] }).assets,
        (asset) => asset.asset_contract.schema_name === "ERC721"
      )
      const ownerNFTs = _.map(filteredAssets, (os) => ({
        tokenId: os.token_id,
        img: os.image_url,
        collectionTitle: os.collection.name,
        address: os.asset_contract.address,
      }))
      setNFTs(ownerNFTs)
      setIsLoading(false)
    }

    if (account && nfts === null) {
      loadNFTs()
    }
  }, [account, nfts])

  const toggle = () => setOpenModal(!openModal)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElements = e.target as CreatePoolForm<typeof e.target>

    if (!chosePool) {
      const link = formElements.openseaLink.value
      const addressIndex = link.indexOf("assets/") + "assets/".length
      const tokenIndex = addressIndex + 43
      const address = link.slice(addressIndex, tokenIndex - 1)
      const tokenId = link.slice(tokenIndex, link.length)

      try {
        const os = (await openseaGet(
          `asset/${address}/${tokenId}`
        )) as OpenSeaAsset

        if (os.asset_contract.schema_name !== "ERC721") {
          alert("The NFT must be an ERC-721!")
          return
        }
        setNewSesh({
          address,
          tokenId,
          img: os.image_url,
          collectionTitle: os.collection.name,
        })
        setChosePool(true)
      } catch (e) {
        alert("Invalid link")
      }
    } else {
      const poolTokenName = formElements.poolTokenName.value
      const poolTokenSymbol = formElements.poolTokenSymbol.value

      setIsButtonLoading(true)
      const nonce = await factory(ABC_FACTORY)
        .methods.nextVaultIndex(newSesh.address, newSesh.tokenId)
        .call()
      setCurrentNonce(nonce)
      await onCreatePool(
        newSesh.address,
        newSesh.tokenId,
        poolTokenName,
        poolTokenSymbol,
        () => {
          setIsButtonLoading(false)
          toggle()
        }
      )
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <UniversalContainer style={{ alignItems: "center" }}>
      <Modal size="lg" open={openModal} toggle={toggle} centered>
        <ModalBody>
          {newSesh === null ? null : (
            <SplitContainer>
              <VerticalSmallGapContainer>
                <FileContainer
                  img={newSesh.img || ""}
                  animation_url={null}
                  {...newSesh}
                />
                <SubTitle style={{ marginTop: 15 }}>
                  {newSesh.collectionTitle}
                </SubTitle>
                <Title>
                  {newSesh.collectionTitle || newSesh.address} #
                  {newSesh.tokenId}
                </Title>
              </VerticalSmallGapContainer>
              <VerticalSmallGapContainer
                style={{ justifyContent: "space-between" }}
              >
                <Title
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px !important",
                  }}
                >
                  Vault Created!
                </Title>
                <ModalPair
                  title="NFT Address"
                  value={shortenAddress(newSesh.address)}
                />
                <ModalPair title="Token ID" value={newSesh.tokenId} />
                <a
                  href={`/pool?address=${newSesh.address}&tokenId=${newSesh.tokenId}&nonce=${currentNonce}`}
                >
                  <Button style={{ width: "100%", textAlign: "center" }}>
                    Go to pool
                  </Button>
                </a>
              </VerticalSmallGapContainer>
            </SplitContainer>
          )}
        </ModalBody>
      </Modal>
      <div style={{ width: !chosePool ? "100%" : "auto" }}>
        <Form onSubmit={handleSubmit}>
          <TitleContainer>
            <div>
              <Title style={{ marginBottom: 3 }}>Create a Pool</Title>
              <Subheader>
                Create an Abacus Spot Pool {!chosePool && "- Choose an NFT"}
              </Subheader>
            </div>
            <Button
              type="submit"
              style={{ maxWidth: "fit-content", height: 40 }}
              disabled={
                !account || isButtonLoading || (newSesh === null && chosePool)
              }
            >
              {isButtonLoading
                ? "Loading..."
                : newSesh === null
                ? "Select NFT"
                : "Create Pool"}
            </Button>
          </TitleContainer>
          {!chosePool ? (
            <ListGroupStyled>
              <ListGroupItem>
                <InputWithTitle
                  title="NFT Link (OpenSea)"
                  id="openseaLink"
                  placeholder="https://opensea.io/assets/0x0000000000000000000000000000000000000000/1"
                />
              </ListGroupItem>
            </ListGroupStyled>
          ) : (
            <>
              <ListGroupStyled>
                <img src={newSesh.img} alt="NFT for Spot Pool" />
                <ListGroupItem>
                  <InputWithTitle
                    title="Pool Token Name"
                    id="poolTokenName"
                    placeholder="BAYC Vault"
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <InputWithTitle
                    title="Pool Token Symbol"
                    id="poolTokenSymbol"
                    placeholder="BAYC"
                  />
                </ListGroupItem>
              </ListGroupStyled>
            </>
          )}
        </Form>
      </div>
    </UniversalContainer>
  )
}

export default CreatePool
