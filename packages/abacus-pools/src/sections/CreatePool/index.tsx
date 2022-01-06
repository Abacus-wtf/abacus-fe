import React, { useState, FormEvent } from "react"
import {
  Title,
  Subheader,
  UniversalContainer,
  SubText,
} from "@components/global.styles"
import { ListGroup, ListGroupItem, Form, Modal, ModalBody } from "shards-react"
import { InputWithTitle } from "@components/Input"
import Button, { ButtonsWhite } from "@components/Button"
import styled from "styled-components"
import { useActiveWeb3React } from "@hooks/index"
import { ZERO_ADDRESS } from "@config/constants"
import { shortenAddress } from "@config/utils"
import { theme } from "@config/theme"
import { Pool } from "@state/poolData/reducer"
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

const ModalPair = ({ title, value }: { title: string; value: string }) => (
  <div style={{ marginBottom: 10 }}>
    <ModalSubtitle>{title}</ModalSubtitle>
    <ModalTitle>{value}</ModalTitle>
  </div>
)

const CreatePool: React.FC = () => {
  const { account } = useActiveWeb3React()
  const [openModal, setOpenModal] = useState(false)
  const [newSesh /* , setNewSesh */] = useState<Pool | null>(null)

  const toggle = () => setOpenModal(!openModal)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* const pricingSession = getPricingSessionContract(
      ABC_PRICING_SESSION_ADDRESS(networkSymbol)
    )
    const formElements = e.target as CreateSessionForm<typeof e.target>
    const nftAddress = formElements.nftAddress.value
    const tokenId = formElements.tokenId.value
    const initAppraisal = formElements.initAppraisal.value
    const votingTime = Number(formElements.votingTime.value)
    const bounty =
      formElements.initBounty.value === "" ||
      Number(formElements.initBounty.value) === 0
        ? undefined
        : formElements.initBounty.value

    const meta = await openseaGet(`asset/${nftAddress}/${tokenId}`)

    if (!meta.token_id) {
      alert("The NFT Address and Token ID you have entered is not valid")
      return
    }

    if (votingTime > 24) {
      alert("You must choose a voting time that is 24 hours or below")
    } */
  }

  return (
    <UniversalContainer style={{ alignItems: "center" }}>
      <Modal size="lg" open={openModal} toggle={toggle} centered>
        <ModalBody>
          {newSesh === null ? null : (
            <SplitContainer>
              <VerticalSmallGapContainer>
                <FileContainer {...newSesh} />
                <SubTitle style={{ marginTop: 15 }}>
                  {newSesh.collectionTitle}
                </SubTitle>
                <Title>
                  {newSesh.nftName} #{newSesh.tokenId}
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
                  Session Created!
                </Title>
                <ModalPair
                  title="NFT Address"
                  value={shortenAddress(newSesh.address)}
                />
                <ModalPair title="Token ID" value={newSesh.tokenId} />
                <a
                  href={`/pool?address=${newSesh.address}&tokenId=${newSesh.tokenId}`}
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
      <div>
        <Title style={{ marginBottom: 3 }}>Create a Pool</Title>
        <Subheader>Create an Abacus Nuclear Pool</Subheader>
        <Form onSubmit={handleSubmit}>
          <ListGroupStyled>
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
            <ListGroupItem>
              <InputWithTitle
                title="NFT address"
                id="nftAddress"
                placeholder={ZERO_ADDRESS}
              />
            </ListGroupItem>
            <ListGroupItem>
              <InputWithTitle title="Token ID" id="tokenId" placeholder="10" />
            </ListGroupItem>
            <ListGroupItem>
              <InputWithTitle
                title="Initial Value of NFT (ETH)"
                id="initMC"
                placeholder="100"
              />
            </ListGroupItem>
            <ListGroupItem>
              <InputWithTitle
                title="Exit Fee (%)"
                id="exitFee"
                placeholder="5"
              />
            </ListGroupItem>
          </ListGroupStyled>
          <div
            style={{ display: "flex", flexDirection: "column", gridGap: 10 }}
          >
            <ButtonsWhite
              type="submit"
              style={{ maxWidth: "fit-content" }}
              disabled={!account}
            >
              Create Pool
            </ButtonsWhite>
            {!account && <SubText>Connect your wallet first</SubText>}
          </div>
        </Form>
      </div>
    </UniversalContainer>
  )
}

export default CreatePool
