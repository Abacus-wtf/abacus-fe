import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveTransfer, useOnExitPool } from "@hooks/vaultFunc"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import {
  Section,
  Exa,
  ProgressBar,
  Kilo,
  Button,
  ButtonType,
  PersistentBanner,
} from "abacus-ui"
import { Link } from "gatsby"
import React, { FunctionComponent, useEffect, useMemo, useState } from "react"
import styled from "styled-components"

enum Page {
  ApproveContract,
  ClosePool,
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
  address: string
  tokenId: string
  nonce: string
}

type Content = {
  title: string
  status: string
  progress: number
  copy: React.ReactNode
  buttonProps: {
    buttonType: ButtonType
    buttonText: string
    onClick?: () => void
  }
  as?: React.ReactNode
  to?: string
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  address,
  tokenId,
  nonce,
}) => {
  const [page, setPage] = useState<Page>(Page.ApproveContract)
  const { vaultAddress, isManager, approved, auction } = useGetPoolData()
  const { onApproveTransfer, isPending: isPendingApproval } =
    useOnApproveTransfer()
  const { onExitPool, isPending: isPendingExit } = useOnExitPool()

  const isPending = isPendingApproval || isPendingExit

  useEffect(() => {
    if (approved && page === Page.ApproveContract) {
      setPage(Page.ClosePool)
    }
    if (Boolean(auction) && page !== Page.PoolClosed) {
      setPage(Page.PoolClosed)
    }
  }, [approved, page, auction])

  const { progress, status, copy, buttonProps, title } =
    useMemo<Content>(() => {
      switch (page) {
        case Page.ApproveContract:
          return {
            title: "Approve the Contract",
            status: "Approve Contract",
            progress: 0.33,
            copy: (
              <p>
                To close your pool, you will first need to approve the contract
              </p>
            ),
            buttonProps: {
              buttonType: ButtonType.Standard,
              buttonText: "Approve contract",
              onClick: async () => {
                if (isManager) {
                  onApproveTransfer(vaultAddress, () => {
                    setPage(Page.ClosePool)
                  })
                } else {
                  console.warn(
                    "You are not the owner of this Pool, and cannot close it"
                  )
                }
              },
            },
          }
        case Page.ClosePool:
          return {
            title: "Close your Pool",
            status: "Close Pool",
            progress: 0.66,
            copy: (
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
            ),
            buttonProps: {
              buttonType: ButtonType.Standard,
              buttonText: "Yes, close this pool!",
              onClick: async () => {
                if (isManager) {
                  onExitPool(vaultAddress, () => {
                    setPage(Page.PoolClosed)
                  })
                } else {
                  console.warn(
                    "You are not the owner of this Pool, and cannot close it"
                  )
                }
              },
            },
          }
        case Page.PoolClosed:
          return {
            title: "Congratulations!",
            status: "Pool Closed",
            progress: 1,
            copy: (
              <p>
                Your pool has sucessfully been closed and the auction started.
              </p>
            ),
            buttonProps: {
              buttonType: ButtonType.Gray,
              buttonText: "Go to Auction Page >",
              as: Link,
              to: `/auction?address=${address}&tokenId=${tokenId}&nonce=${nonce}`,
            },
          }
        default:
          return {
            title: "Something went wrong...",
            status: "",
            progress: 0,
            copy: null,
            buttonProps: {
              buttonType: ButtonType.Standard,
              buttonText: "...",
            },
          }
      }
    }, [
      address,
      isManager,
      nonce,
      onApproveTransfer,
      onExitPool,
      page,
      tokenId,
      vaultAddress,
    ])

  return (
    <Container>
      <LoadingOverlay loading={isPending} />
      <StyledProgressBar progress={progress} label={null} />
      <Wrapper>
        <PageStatus>
          <span>{page + 1}/3</span> {status}
        </PageStatus>
        <Title>{title}</Title>
        <Main>{copy}</Main>
        <StyledButton
          {...buttonProps}
          fullWidth={buttonProps.buttonType === ButtonType.Standard}
          disabled={page !== Page.PoolClosed && (!isManager || isPending)}
        >
          {isPending ? "Pending tx..." : buttonProps.buttonText}
        </StyledButton>
      </Wrapper>
      {!isManager && !auction && (
        <PersistentBanner type="error" bottom="0">
          Only the owner of the pool can close it
        </PersistentBanner>
      )}
    </Container>
  )
}

export { CurrentState }
