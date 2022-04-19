import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { Button, ButtonType, Input, CardWithTitle } from "abacus-ui"

const FullWidthButton = styled(Button)`
  width: 100%;
`

type FundCardProps = {
  title: string
  buttonTitle: string
  onClick: () => void
}

const FundCard: FunctionComponent<FundCardProps> = ({
  title,
  buttonTitle,
  onClick,
}) => {
  const [value, setValue] = useState("")
  return (
    <CardWithTitle
      noBorder
      style={{ height: 250, justifyContent: "space-between" }}
      title={title}
    >
      <>
        <Input
          showEth
          placeholder="0"
          type="text"
          name="Funds"
          value={value}
          onChange={(amount) => setValue(amount)}
        />
        <FullWidthButton
          disabled={value.length === 0}
          buttonType={ButtonType.Standard}
          onClick={onClick}
        >
          {buttonTitle}
        </FullWidthButton>
      </>
    </CardWithTitle>
  )
}

export default FundCard
