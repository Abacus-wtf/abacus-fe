import styled from "styled-components"
import React, { useState } from "react"
import {
  NetworkInfoMap,
  NetworkInfo,
  NetworkSymbolAndId,
  ETH_RPC,
  NetworkSymbolEnum,
} from "@config/constants"
import { useActiveWeb3React } from "@hooks/index"
import {
  useGetCurrentNetwork,
  useIsSelectNetworkModalOpen,
  useSetIsSelectNetworkModalOpen,
} from "@state/application/hooks"
import { theme } from "@config/theme"
import { Modal, Activity } from "abacus-ui"
import Button from "../Button"

const StyledMenuButton = styled.button`
  position: relative;
  width: auto;
  border: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  background-color: #fff;
  opacity: 1;
  font-weight: 700;
  border-radius: 4px;
  transition: opacity 0.3s;
  height: 44px;
  margin-bottom: 10px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 0.8;
  }

  @media ${theme.mediaMin.splitCenter} {
    margin-bottom: 0;
    padding: 0.15rem 0.5rem;
    height: 100%;
  }
`

const Aligner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const AlignerColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NetworkButton = styled(Button)`
  width: 40%;
  align-self: center;
  align-items: center;
  alignment-baseline: center;
  margin: 20px;
  text-align: center;
  border-radius: 4px;
  transition: 0.3s;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`

export const NetworkSelectorModal = () => {
  const showModal = useIsSelectNetworkModalOpen()
  const setShowModal = useSetIsSelectNetworkModalOpen()
  const { chainId } = useActiveWeb3React()

  if (typeof window === "undefined") {
    return null
  }

  const { ethereum } = window as any
  const MetamaskRequest = async (network: NetworkInfo) => {
    if (network.chainId === 1) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        })
        setShowModal(false)
      } catch (error) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x1",
                  rpcUrl: [ETH_RPC],
                  chainName: "Ethereum Mainnet",
                  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                },
              ],
            })
            setShowModal(false)
          } catch (err) {
            console.log(err, "error on add eth chain")
          }
        }
      }
    } else if (network.chainId === 3) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }],
        })
        setShowModal(false)
      } catch (error) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x3",
                  rpcUrl: [ETH_RPC],
                  chainName: "Rinkeby Test Network",
                  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                },
              ],
            })
            setShowModal(false)
          } catch (err) {
            console.log(err, "error on add eth chain")
          }
        }
      }
    } else {
      ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${network.chainId.toString(16)}`,
              chainName: network.network,
              nativeCurrency: {
                name: network.symbol,
                symbol: network.symbol,
                decimals: 18,
              },
              rpcUrls: [network.rpc],
              blockExplorerUrls: [network.blockExplorer],
            },
          ],
        })
        .then(() => setShowModal(false))
    }
  }
  return (
    <Modal isOpen={showModal} closeModal={() => setShowModal(!showModal)}>
      <AlignerColumn>
        <h4>Select network</h4>
        <Aligner>
          {NetworkInfoMap.map((network) => (
            <NetworkButton
              key={network.chainId}
              disabled={network.chainId === chainId}
              onClick={() => MetamaskRequest(network)}
            >
              <Aligner>
                <img
                  alt=""
                  src={network.logo}
                  style={{ paddingRight: "10px", height: "18px" }}
                />
                {NetworkSymbolAndId[network.chainId]}
              </Aligner>
            </NetworkButton>
          ))}
        </Aligner>
      </AlignerColumn>
    </Modal>
  )
}

const NetworkSelectorButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const networkSymbol = useGetCurrentNetwork()

  return (
    <>
      <StyledMenuButton onClick={() => setShowModal(!showModal)}>
        <Aligner>
          {networkSymbol && networkSymbol !== NetworkSymbolEnum.NONE ? (
            <img
              alt=""
              src={require(`../../images/${networkSymbol}.svg`)}
              style={{ marginRight: "10px", height: "18px", width: "auto" }}
            />
          ) : (
            <div style={{ marginRight: "10px", height: "18px", width: "auto" }}>
              <Activity />
            </div>
          )}
          {(networkSymbol && networkSymbol !== NetworkSymbolEnum.NONE) ||
            "Change Network"}
        </Aligner>
      </StyledMenuButton>
      <NetworkSelectorModal />
    </>
  )
}

export default NetworkSelectorButton
