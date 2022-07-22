import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import {
  ABC_NFT_ETH,
  GRAPHQL_ENDPOINT,
  IS_PRODUCTION,
  OPENSEA_LINK,
} from "@config/constants"
import {
  matchOpenSeaAssetToNFT,
  OpenSeaAsset,
  openseaGet,
  openseaGetMany,
  OpenSeaGetManyParams,
} from "abacus-utils"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import {
  GetNftDocument,
  GetNftQuery,
  GetNftQueryVariables,
  NfTsDocument,
  NfTsQuery,
  NfTsQueryVariables,
  Nft_Filter,
  Nft_OrderBy,
  OrderDirection,
} from "abacus-graph"
import { BigNumber } from "ethers"
import { map } from "lodash"
import ERC_721_ABI from "../../config/contracts/ERC_721_ABI.json"
import ABC_NFT_ETH_ABI from "../../config/contracts/ABC_NFT_ETH_ABI.json"
import LEND_ABI from "../../config/contracts/ABC_LEND_MULTI_ABI.json"
import ABC_VAULT_ABI from "../../config/contracts/ABC_VAULT_ABI.json"
import { ABC_LEND } from "../../config/constants"

import { PAGINATE_BY } from "./constants"
import {
  currentLendingNftSelector,
  fetchingCurrentLendingNftSelector,
  lendingNftsSelector,
  nftHealthRatioSelector,
} from "./selectors"
import {
  setLendingNfts,
  setCurrentLendingNft,
  setFetchingCurrentLendingNft,
  setCurrentLendingNFTVaultInfo,
} from "./actions"
import { LendingNFT } from "./reducer"

const parseAsset = (account: string) => (asset: OpenSeaAsset) => ({
  address: asset.asset_contract.address,
  tokenId: asset.token_id,
  img: asset.image_preview_url || asset.image_url,
  alt: asset.name,
  name: asset.name,
  collectionTitle: asset.collection.name,
  collectionLink: asset?.collection?.name
    ? `https://${
        IS_PRODUCTION ? "" : "testnets."
      }opensea.io/collection/${asset.collection.name.toLowerCase()}`
    : "",
  owner: asset?.owner.address,
  isManager: asset?.owner.address.toLowerCase() === account?.toLowerCase(),
})

const parseSubgraphNFTs = async (nfts: NfTsQuery["nfts"], account?: string) => {
  const mappedNfts: OpenSeaGetManyParams = nfts.map((nft) => ({
    nftAddress: nft.address,
    tokenId: nft.tokenId,
  }))
  const { assets } = await openseaGetMany(mappedNfts, {
    url: OPENSEA_LINK,
  })
  const nftData: LendingNFT[] = map(nfts, (nft) => {
    const asset = matchOpenSeaAssetToNFT(assets, {
      nftAddress: nft.address,
      tokenId: nft.tokenId,
    })
    const assetData = parseAsset(account)(asset)
    return {
      ...assetData,
      lendApproved: false,
      repayApproved: false,
      nEthBalance: BigNumber.from(0),
      vaults: nft.vaults.map(({ vault }) => ({ ...vault })),
      reservationStatus: false,
      nextReservationStatus: false,
    }
  })
  return nftData
}

export const useFetchLendingNFTs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const lendMulti = useMultiCall(LEND_ABI)

  return useCallback(
    async (
      orderBy?: Nft_OrderBy,
      orderDirection?: OrderDirection,
      where?: Nft_Filter
    ) => {
      // @TODO: Fix for multipage
      const variables: NfTsQueryVariables = {
        first: PAGINATE_BY,
        skip: 0 * PAGINATE_BY,
        orderBy: orderBy || Nft_OrderBy.Address,
        orderDirection: orderDirection || OrderDirection.Desc,
        where: where ?? null,
      }

      const { nfts } = await request<NfTsQuery>(
        GRAPHQL_ENDPOINT,
        NfTsDocument,
        variables
      )

      const positions = await lendMulti(
        ABC_LEND,
        nfts.map(() => "getPosition"),
        nfts.map(({ address, tokenId }) => [address, tokenId])
      )

      const parsedNfts = await parseSubgraphNFTs(nfts, account)
      const nftsWithPosition = parsedNfts.map((nft, i) => ({
        ...nft,
        loan: {
          borrower: positions[i][0],
          pool: positions[i][1],
          loanAmount: BigNumber.from(positions[i][2]),
        },
      }))

      dispatch(setLendingNfts(nftsWithPosition))
    },
    [account, dispatch, lendMulti]
  )
}

export const useLendingNFTs = () =>
  useSelector<AppState, AppState["lending"]["nfts"]>(lendingNftsSelector)

export const useFetchCurrentLendingNFT = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const lendMulti = useMultiCall(LEND_ABI)
  const erc721 = useWeb3Contract(ERC_721_ABI)
  const nEthMulti = useMultiCall(ABC_NFT_ETH_ABI)

  return useCallback(
    async (address: string, tokenId: string) => {
      dispatch(setFetchingCurrentLendingNft(true))
      let lendingNFT: LendingNFT
      try {
        const id = `${address}/${tokenId}`

        const variables: GetNftQueryVariables = {
          id,
        }
        const { nft } = await request<GetNftQuery>(
          GRAPHQL_ENDPOINT,
          GetNftDocument,
          variables
        )

        const asset = await openseaGet(`asset/${id}`, {
          url: OPENSEA_LINK,
        })

        const parsedAsset = parseAsset(account)(asset)

        const [position] = await lendMulti(
          ABC_LEND,
          ["getPosition"],
          [[address, tokenId]]
        )

        const lendApproved = await erc721(nft.address)
          .methods.isApprovedForAll(account, ABC_LEND)
          .call()

        const [[nEthAllowance], [nEthBalance]] = await nEthMulti(
          ABC_NFT_ETH,
          ["allowance", "balanceOf"],
          [[account, ABC_LEND], [account]]
        )

        lendingNFT = {
          ...parsedAsset,
          vaults: nft.vaults.map(({ vault }) => ({
            ...vault,
          })),
          lendApproved,
          repayApproved: BigNumber.from(nEthAllowance).gte(BigNumber.from(0)),
          nEthBalance,
          reservationStatus: false,
          nextReservationStatus: false,
          loan: {
            borrower: position[0],
            pool: position[1],
            loanAmount: BigNumber.from(position[2]),
          },
        }
      } catch {
        console.log("unable to fetch currentLendingNft")
      }

      dispatch(setFetchingCurrentLendingNft(false))
      if (lendingNFT) {
        dispatch(setCurrentLendingNft(lendingNFT))
      }
    },
    [account, dispatch, erc721, lendMulti, nEthMulti]
  )
}

export const useFetchVaultRelatedLendingData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vaultMulti = useMultiCall(ABC_VAULT_ABI)

  return useCallback(
    async (vaultId: string, address: string, tokenId: string) => {
      if (vaultId) {
        const now = Math.floor(new Date().getTime() / 1000)
        const next = now + 12 * 60 * 60
        const [[currentEpoch], [nextEpoch]] = await vaultMulti(
          vaultId,
          ["getEpoch", "getEpoch"],
          [[now], [next]]
        )

        const [[payoutPerRes], [reservationStatus], [nextReservationStatus]] =
          await vaultMulti(
            vaultId,
            ["getPayoutPerRes", "getReservationStatus", "getReservationStatus"],
            [
              [currentEpoch],
              [address, tokenId, currentEpoch],
              [address, tokenId, nextEpoch],
            ]
          )

        const totalAvailable = BigNumber.from(payoutPerRes)
          .mul(BigNumber.from(19))
          .div(BigNumber.from(20))

        if (totalAvailable) {
          dispatch(
            setCurrentLendingNFTVaultInfo({
              totalAvailable,
              reservationStatus,
              nextReservationStatus,
            })
          )
        }
      }
    },
    [dispatch, vaultMulti]
  )
}

export const useCurrentLendingNFT = () =>
  useSelector<AppState, AppState["lending"]["currentNft"]>(
    currentLendingNftSelector
  )

export const useFetchingCurrentLendingNft = () =>
  useSelector<AppState, AppState["lending"]["fetchingCurrentNft"]>(
    fetchingCurrentLendingNftSelector
  )

export const useCurrentLendingNFTHealthRatio = () =>
  useSelector<AppState, number>(nftHealthRatioSelector)
