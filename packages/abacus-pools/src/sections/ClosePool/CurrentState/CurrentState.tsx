import { useOnExitPool } from "@hooks/vaultFunc"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import {
  Section,
  Exa,
  ProgressBar,
  Kilo,
  P,
  Button,
  ButtonType,
  PersistentBanner,
} from "abacus-ui"
import { Link } from "gatsby"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"

enum Page {
  ApproveContract,
  PoolClosed,
}

const Container = styled(Section)`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: max-content;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
  min-height: unset;
  width: 100%;
  position: absolute;
  top: 0;
`

const Title = styled(Exa)`
  font-family: "Bluu next";
  font-weight: bold;
  text-align: center;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  font-size: 22px;

  & ul {
    padding: 0 8px;
    list-style-position: inside;
  }
`

const PageStatus = styled(Kilo)`
  align-self: center;

  & span {
    color: ${({ theme }) => theme.colors.utility.green};
  }
`

const StyledButton = styled(Button)<{ fullWidth: boolean }>`
  ${({ fullWidth }) => (fullWidth ? "width: 100%;" : "")}
  margin-bottom: 20px;
  align-self: center;
`

type CurrentStateProps = {
  refreshPoolData: () => void
  address: string
  tokenId: string
  nonce: string
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  refreshPoolData,
  address,
  tokenId,
  nonce,
}) => {
  const [page, setPage] = useState<Page>(Page.ApproveContract)
  const isFirstPage = page === Page.ApproveContract
  const progress = isFirstPage ? 0.5 : 1
  const status = isFirstPage ? "Approve Contract" : "Pool Closed"
  const { vaultAddress, isManager } = useGetPoolData()
  const { onExitPool, isPending } = useOnExitPool()

  const copy = useMemo(
    () =>
      isFirstPage ? (
        <>
          <p>Are you sure you want to close your pool?</p>
          <p>Here is what you need to know;</p>
          <ul>
            <li>
              <strong>This action is irriversible.</strong>
            </li>
            <li>A 24h auction will start at pool closure.</li>
            <li>The auction proceeds will be sent to your wallet.</li>
          </ul>
        </>
      ) : (
        <P>Your pool has sucessfully been closed and the auction started.</P>
      ),
    [isFirstPage]
  )

  const buttonProps = {
    buttonType: isFirstPage ? ButtonType.Standard : ButtonType.Gray,
    buttonText: isFirstPage ? "Yes, close this pool!" : "Go to Auction Page >",
    onClick: isFirstPage
      ? async () => {
          if (isManager) {
            onExitPool(vaultAddress, () => {
              setPage(Page.PoolClosed)
              refreshPoolData()
            })
          } else {
            console.warn(
              "You are not the owner of this Pool, and cannot close it"
            )
          }
        }
      : undefined,
    as: isFirstPage ? undefined : Link,
    to: isFirstPage
      ? undefined
      : `/auction?address=${address}&tokenId=${tokenId}&nonce=${nonce}`,
  }

  return (
    <Container>
      <StyledProgressBar progress={progress} label={null} />
      <Wrapper>
        <PageStatus>
          <span>{page + 1}/2</span> {status}
        </PageStatus>
        <Title>{isFirstPage ? "Close your Pool" : "Congratulations!"}</Title>
        <Main>{copy}</Main>
        <StyledButton
          {...buttonProps}
          fullWidth={isFirstPage}
          disabled={!isManager}
        >
          {isPending ? "Closing pool..." : buttonProps.buttonText}
        </StyledButton>
      </Wrapper>
      <PersistentBanner type="error" bottom="0">
        Only the owner of the pool can close it
      </PersistentBanner>
    </Container>
  )
}

export { CurrentState }
