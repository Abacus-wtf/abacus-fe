import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import { Modal, H2 } from "abacus-ui"
import { useOnCreateNewSession } from "@hooks/create-sessions"
import Form from "./Form"
import Preview from "./Preview"
import Success from "./Success"

type CreateSessionModalProps = {
  isOpen: boolean
  closeModal: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 400px;
`

const StyledH2 = styled(H2)`
  width: 100%;
  text-align: center;
  font-family: "Bluu next";
`

export type FormValues = {
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

enum ModalState {
  Form,
  Preview,
  Success,
}

const CreateSessionModal: FunctionComponent<CreateSessionModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { onCreateNewSession, isPending } = useOnCreateNewSession()
  const [modalState, setModalState] = useState(ModalState.Form)
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES)

  const { heading, body } = useMemo(() => {
    const createSession = async () => {
      const votingTime = Number(formValues.votingTime) * 60 * 60
      await onCreateNewSession(
        formValues.nftAddress,
        formValues.tokenId,
        formValues.initialAppraisal,
        votingTime,
        async (response) => {
          response?.wait().then(() => {
            setModalState(ModalState.Success)
          })
        },
        formValues.bounty
      )
    }

    switch (modalState) {
      case ModalState.Form:
        return {
          heading: "Start a new appraisal",
          body: (
            <Form
              onSubmit={() => setModalState(ModalState.Preview)}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          ),
        }
      case ModalState.Preview:
        return {
          heading: "Preview your session",
          body: (
            <Preview
              formValues={formValues}
              createSession={createSession}
              isPendingCreateSession={isPending}
            />
          ),
        }
      case ModalState.Success:
        return { heading: "Session created!", body: <Success /> }
      default:
        return {}
    }
  }, [formValues, isPending, modalState, onCreateNewSession])

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <StyledH2 as="label" htmlFor="create_new_session">
          {heading}
        </StyledH2>
        {body}
      </Container>
    </Modal>
  )
}

export default CreateSessionModal
