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
import { useActiveWeb3React } from "@hooks/index"
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
        lendingNFT = {
          ...parsedAsset,
          vaults: nft.vaults.map(({ vault }) => ({ ...vault })),
        }
      } catch {
        console.log("unable to fetch currentLendingNft")
      }

      dispatch(setFetchingCurrentLendingNft(false))
      if (lendingNFT) {
        dispatch(setCurrentLendingNft(lendingNFT))
      }
    },
    [account, dispatch]
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
