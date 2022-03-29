import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { map, keys } from "lodash"
import { graphql, useStaticQuery } from "gatsby"
import { Modal, Media } from "abacus-ui"
import { AbstractConnector } from "@web3-react/abstract-connector"
import { AppState } from "@state/index"
import { useToggleWalletModal } from "@state/application/hooks"
import { SUPPORTED_WALLETS } from "@config/constants"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import Option from "./Option"

const OptionsContainer = styled.div`
  display: grid;

  ${Media.sm`
    grid-template-columns: 50% 50%;
  `}
`

const Web3Modal: FunctionComponent = () => {
  const { connector, activate } = useWeb3React()
  const isWalletModalOpen = useSelector<
    AppState,
    AppState["application"]["isWalletModalOpen"]
  >((state) => state.application.isWalletModalOpen)
  const toggleWalletModal = useToggleWalletModal()

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name
      }
      return true
    })

    // eslint-disable-next-line no-unused-expressions
    connector &&
      activate(connector, undefined, true)
        .then(() => {
          toggleWalletModal()
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector)
          }
        })
  }
  const {
    allFile: { edges },
  } = useStaticQuery<{
    allFile: {
      edges: { node: { publicURL: string; name: string; extension: string } }[]
    }
  }>(graphql`
    {
      allFile {
        edges {
          node {
            publicURL
            name
            extension
          }
        }
      }
    }
  `)
  return (
    <Modal isOpen={isWalletModalOpen} closeModal={toggleWalletModal}>
      <OptionsContainer>
        {map(keys(SUPPORTED_WALLETS), (key) => {
          const option = SUPPORTED_WALLETS[key]
          const iconUrl = edges.find(
            (edge) =>
              `${edge.node.name}.${edge.node.extension}` === option.iconName
          )
          return (
            <Option
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={iconUrl?.node.publicURL}
            />
          )
        })}
      </OptionsContainer>
    </Modal>
  )
}

export default Web3Modal
