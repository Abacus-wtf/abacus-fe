import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Input } from "abacus-ui"
import { InputError } from "@components/index"
import useValidate from "@hooks/useValidate"
import { FormValues } from "./CreateSessionModal"
import { initialAppraisalChecks, votingTimeChecks } from "./validators"

enum NewSessionInputs {
  BOUNTY = "bounty",
  NFT_ADDRESS = "nft_address",
  TOKEN_ID = "token_id",
  INITIAL_APPRAISAL = "initial_appraisal",
  VOTING_TIME = "voting_time",
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 8px;
  margin-top: 16px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 8px));
  width: 100%;
  grid-column-gap: 16px;
`

type FormProps = {
  formValues: FormValues
  setFormValues: React.Dispatch<FormValues>
  onSubmit: () => void
}

const Form: FunctionComponent<FormProps> = ({
  formValues,
  setFormValues,
  onSubmit,
}) => {
  const initialAppraisalValid = useValidate(
    formValues.initialAppraisal,
    initialAppraisalChecks
  )
  const votingTimeValid = useValidate(formValues.votingTime, votingTimeChecks)

  const submitDisabled =
    Object.keys(formValues).some(
      (key) => key !== "bounty" && !formValues[key]
    ) ||
    !initialAppraisalValid.valid ||
    !votingTimeValid.valid

  return (
    <StyledForm name="create_new_session" onSubmit={onSubmit}>
      <Input
        placeholder="0x012dd3f..."
        type="text"
        name={NewSessionInputs.NFT_ADDRESS}
        label="NFT Address"
        value={formValues.nftAddress}
        onChange={(value) =>
          setFormValues({ ...formValues, nftAddress: value })
        }
        required
      />
      <Input
        placeholder="420"
        type="text"
        name={NewSessionInputs.TOKEN_ID}
        label="Token ID"
        value={formValues.tokenId}
        onChange={(value) => setFormValues({ ...formValues, tokenId: value })}
        required
      />
      <GridContainer>
        <Input
          placeholder="69 ETH"
          type="number"
          name={NewSessionInputs.INITIAL_APPRAISAL}
          label="Initial Appraisal"
          value={formValues.initialAppraisal}
          onChange={(value) =>
            setFormValues({ ...formValues, initialAppraisal: value })
          }
          required
          hint={
            !initialAppraisalValid.valid && (
              <InputError>{initialAppraisalValid.message}</InputError>
            )
          }
        />
        <Input
          placeholder="0.1 ETH"
          type="number"
          name={NewSessionInputs.BOUNTY}
          label="Initial Bounty"
          value={String(formValues.bounty)}
          onChange={(value) => setFormValues({ ...formValues, bounty: value })}
        />
      </GridContainer>
      <Input
        placeholder="24 Hours"
        type="number"
        name={NewSessionInputs.VOTING_TIME}
        label="Voting Time"
        value={formValues.votingTime}
        onChange={(value) =>
          setFormValues({ ...formValues, votingTime: value })
        }
        required
        hint={
          !votingTimeValid.valid && (
            <InputError>{votingTimeValid.message}</InputError>
          )
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
  )
}

export default Form
