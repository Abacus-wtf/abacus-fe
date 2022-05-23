import React from "react"
import { Countdown, InfoBarTitle } from "@components/index"
import { Select } from "abacus-ui"
import moment from "moment"
import { EPOCH_LENGTH } from "@config/constants"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../Claim.styles"

type EpochProps = {
  epoch: number
  setEpoch: React.Dispatch<number>
  epochs: string[]
  endTime: number
}

const Epoch = ({ epochs, epoch, setEpoch, endTime }: EpochProps) => {
  const startTime = endTime - EPOCH_LENGTH
  const format = "DD/MM/YYYY"
  return (
    <StyledSection>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch</InfoBarTitle>
        <StyledInfoBarContent>
          <Select
            value={`#${epoch}`}
            setValue={(nextEpoch) =>
              setEpoch(Number(nextEpoch.replaceAll("#", "")))
            }
            options={epochs}
          />
        </StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch Ending In</InfoBarTitle>
        <StyledInfoBarContent>
          <Countdown endTime={endTime} key={`${epoch}`} />
        </StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch Range</InfoBarTitle>
        <StyledInfoBarContent>
          {moment(startTime).format(format)}&nbsp;<span>to</span>&nbsp;
          {moment(endTime).format(format)}
        </StyledInfoBarContent>
      </StyledInfoBarItem>
    </StyledSection>
  )
}

export { Epoch }
