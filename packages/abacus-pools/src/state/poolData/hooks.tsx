import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import { GRAPHQL_ENDPOINT, OPENSEA_LINK } from "@config/constants"
import {
  openseaGetMany,
  OpenSeaGetManyParams,
  matchOpenSeaAssetToNFT,
} from "abacus-utils"
import _ from "lodash"
import { useActiveWeb3React } from "@hooks/index"
import {
  GetPoolsDocument,
  GetPoolsQuery,
  GetPoolsQueryVariables,
  OrderDirection,
  Vault_OrderBy,
} from "abacus-graph"
import { getPools, getMyPools } from "./actions"
import { Pool, PoolStatus } from "./reducer"
import { PAGINATE_BY } from "./constants"
import { poolSizeSelector, tokenLockHistorySelector } from "./selectors"

const parseSubgraphVaults = async (vaults: GetPoolsQuery["vaults"]) => {
  const INITIAL_NFTS: OpenSeaGetManyParams = []
  const nfts = vaults.reduce((acc, vault) => {
    const nextNfts = vault.nfts.map(({ nft }) => ({
      nftAddress: nft.address,
      tokenId: nft.tokenId,
    }))
    return [...acc, ...nextNfts]
  }, INITIAL_NFTS)
  const { assets } = await openseaGetMany(nfts, {
    url: OPENSEA_LINK,
  })
  const poolData: Pool[] = _.map(vaults, (vault) => ({
    state:
      vault.status === 0
        ? PoolStatus.Normal
        : vault.status === 1
        ? PoolStatus.Auction
        : PoolStatus.Closed,
    nfts: vault.nfts.map(({ nft }) => {
      const asset = matchOpenSeaAssetToNFT(assets, {
        ...nft,
        nftAddress: nft.address,
      })
      return {
        ...nft,
        name: asset.name,
        img: asset.image_url,
        alt: `${asset.name} in NFT Collection: ${asset.collection}`,
      }
    }),
    name: vault.name,
    vaultAddress: vault.id,
    emissionsStarted: vault.emissionsSigned,
    totalParticipants: vault.totalParticipants,
    tickets: vault.tickets,
  }))
  return poolData
}

export const useSetPools = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (orderBy?: Vault_OrderBy, orderDirection?: OrderDirection) => {
      // @TODO: Fix for multipage
      const variables: GetPoolsQueryVariables = {
        first: PAGINATE_BY,
        skip: 0 * PAGINATE_BY,
        orderBy: orderBy || Vault_OrderBy.Timestamp,
        orderDirection: orderDirection || OrderDirection.Desc,
        where: {
          status_gte: 0,
        },
      }

      const { vaults } = await request<GetPoolsQuery>(
        GRAPHQL_ENDPOINT,
        GetPoolsDocument,
        variables
      )
      const pools = await parseSubgraphVaults(vaults)

      dispatch(getPools(pools))
    },
    [dispatch]
  )
}

export const useSetMyPools = () => {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    if (!account) return
    const variables: GetPoolsQueryVariables = {
      first: PAGINATE_BY,
      skip: 0 * PAGINATE_BY,
      orderBy: Vault_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
      where: { owner: account.toLowerCase() },
    }

    const { vaults } = await request<GetPoolsQuery>(
      GRAPHQL_ENDPOINT,
      GetPoolsDocument,
      variables
    )
    const pools = await parseSubgraphVaults(vaults)
    dispatch(getMyPools(pools))
  }, [dispatch, account])
}

const getPoolsSelector = (state: AppState): AppState["poolData"]["pools"] =>
  state.poolData.pools

export const useGetPools = () =>
  useSelector<AppState, AppState["poolData"]["pools"]>(getPoolsSelector)

const getMyPoolsSelector = (state: AppState): AppState["poolData"]["myPools"] =>
  state.poolData.myPools

export const useGetMyPools = () =>
  useSelector<AppState, AppState["poolData"]["myPools"]>(getMyPoolsSelector)

export const useTokenLockHistory = (vaultId: string) =>
  useSelector<AppState, { uv: number; epoch: number }[]>((state) =>
    tokenLockHistorySelector(state, vaultId)
  )

export const usePoolSize = (vaultId: string) =>
  useSelector<AppState, number>((state) => poolSizeSelector(state, vaultId))
