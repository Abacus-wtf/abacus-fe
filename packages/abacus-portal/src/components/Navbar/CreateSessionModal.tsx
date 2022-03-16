import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { Modal, Button, Input, H2 } from "abacus-ui"
import { navigate } from "gatsby"
import { useOnCreateNewSession } from "@hooks/create-sessions"

type CreateSessionModalProps = {
  isOpen: boolean
  closeModal: () => void
}

enum NewSessionInputs {
  BOUNTY = "bounty",
  NFT_ADDRESS = "nft_address",
  TOKEN_ID = "token_id",
  INITIAL_APPRAISAL = "initial_appraisal",
  VOTING_TIME = "voting_time",
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 8px;
  margin-top: 16px;
`

type FormValues = {
  bounty: string
  nftAddress: string
  tokenId: string
  initialAppraisal: string
  votingTime: string
}

const INITIAL_FORM_VALUES: FormValues = {
  bounty: null,
  nftAddress: "",
  tokenId: "",
  initialAppraisal: null,
  votingTime: null,
}

const CreateSessionModal: FunctionComponent<CreateSessionModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { onCreateNewSession, isPending } = useOnCreateNewSession()
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES)

  const submitDisabled =
    isPending || Object.values(formValues).some((value) => !value)

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <H2 as="label" htmlFor="create_new_session">
          Create New Session
        </H2>
        <StyledForm
          name="create_new_session"
          onSubmit={async (e) => {
            e.preventDefault()
            const votingTime = Number(formValues.votingTime) * 60 * 60
            await onCreateNewSession(
              formValues.nftAddress,
              formValues.tokenId,
              formValues.initialAppraisal,
              votingTime,
              async (response) => {
                response?.wait().then((r) => {
                  // TODO: Get the nonce somehow...
                  console.log("TODO: GET THE NONCE", r)
                  const nonce = 1
                  navigate(
                    `/current-session?address=${formValues.nftAddress}&tokenId=${formValues.tokenId}&nonce=${nonce}`
                  )
                })
              },
              formValues.bounty
            )
          }}
        >
          <Input
            placeholder="0.1 ETH"
            type="number"
            name={NewSessionInputs.BOUNTY}
            disabled={isPending}
            label="Initial Bounty"
            value={String(formValues.bounty)}
            onChange={(value) =>
              setFormValues({ ...formValues, bounty: value })
            }
          />
          <Input
            placeholder="0x012dd3f..."
            type="text"
            name={NewSessionInputs.NFT_ADDRESS}
            disabled={isPending}
            label="NFT Address"
            value={formValues.nftAddress}
            onChange={(value) =>
              setFormValues({ ...formValues, nftAddress: value })
            }
          />
          <Input
            placeholder="420"
            type="text"
            name={NewSessionInputs.TOKEN_ID}
            disabled={isPending}
            label="Token ID"
            value={formValues.tokenId}
            onChange={(value) =>
              setFormValues({ ...formValues, tokenId: value })
            }
          />
          <Input
            placeholder="69 ETH"
            type="number"
            name={NewSessionInputs.INITIAL_APPRAISAL}
            disabled={isPending}
            label="Initial Appraisal"
            value={formValues.initialAppraisal}
            onChange={(value) =>
              setFormValues({ ...formValues, initialAppraisal: value })
            }
          />
          <Input
            placeholder="24 Hours"
            type="number"
            name={NewSessionInputs.VOTING_TIME}
            disabled={isPending}
            label="Voting Time"
            value={formValues.votingTime}
            onChange={(value) =>
              setFormValues({ ...formValues, votingTime: value })
            }
          />
          <Button
            style={{ marginTop: "16px", width: "100%" }}
            type="submit"
            disabled={submitDisabled}
          >
            Submit
          </Button>
        </StyledForm>
      </Container>
    </Modal>
  )
}

export default CreateSessionModal
