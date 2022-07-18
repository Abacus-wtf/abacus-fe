import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import {
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
import _ from "lodash"
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
import ERC_721_ABI from "../../config/contracts/ERC_721_ABI.json"
import LEND_ABI from "../../config/contracts/ABC_LEND_MULTI_ABI.json"
import { ABC_LEND } from "../../config/constants"

import { PAGINATE_BY } from "./constants"
import {
  currentLendingNftSelector,
  fetchingCurrentLendingNftSelector,
  lendingNftsSelector,
} from "./selectors"
import {
  setLendingNfts,
  setCurrentLendingNft,
  setFetchingCurrentLendingNft,
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
  const nftData: LendingNFT[] = _.map(nfts, (nft) => {
    const asset = matchOpenSeaAssetToNFT(assets, {
      nftAddress: nft.address,
      tokenId: nft.tokenId,
    })
    const assetData = parseAsset(account)(asset)
    return {
      ...assetData,
      isApprovedForAll: false,
      vaults: nft.vaults.map(({ vault }) => ({ ...vault })),
    }
  })
  return nftData
}

export const useFetchLendingNFTs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()

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
      const parsedNfts = await parseSubgraphNFTs(nfts, account)

      dispatch(setLendingNfts(parsedNfts))
    },
    [account, dispatch]
  )
}

export const useLendingNFTs = () =>
  useSelector<AppState, AppState["lending"]["nfts"]>(lendingNftsSelector)

export const useFetchCurrentLendingNFT = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const lendMulti = useMultiCall(LEND_ABI)
  const erc721 = useWeb3Contract(ERC_721_ABI)

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

        const [[loans]] = await Promise.all([
          lendMulti(ABC_LEND, ["loans"], [[address, tokenId]]),
        ])

        const borrower = BigNumber.from(loans[0]).toString()
        const pool = BigNumber.from(loans[1]).toString()
        const transferFromPermission = Boolean(
          BigNumber.from(loans[2]).toNumber()
        )
        const loanAmount = BigNumber.from(loans[2])

        let isApprovedForAll = false
        if (parsedAsset.isManager) {
          isApprovedForAll = await erc721(nft.address)
            .methods.isApprovedForAll(account, ABC_LEND)
            .call()
        }

        lendingNFT = {
          ...parsedAsset,
          vaults: nft.vaults.map(({ vault }) => ({
            ...vault,
          })),
          isApprovedForAll,
          loan: {
            borrower,
            pool,
            transferFromPermission,
            loanAmount,
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
    [account, dispatch, erc721, lendMulti]
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
