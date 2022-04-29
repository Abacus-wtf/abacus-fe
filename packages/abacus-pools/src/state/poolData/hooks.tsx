import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import { GRAPHQL_ENDPOINT } from "@config/constants"
import { openseaGetMany, OpenSeaGetResponse } from "@config/utils"
import _ from "lodash"
import { useActiveWeb3React } from "@hooks/index"
import {
  GetPoolsDocument,
  GetPoolsQuery,
  GetPoolsQueryVariables,
  OrderDirection,
  Vault_OrderBy,
} from "abacus-graph"
import { BigNumber } from "ethers"
import { getPools, getMyPools } from "./actions"
import { Pool, PoolStatus } from "./reducer"
import { PAGINATE_BY } from "./constants"
import { tokenLockHistorySelector } from "./selectors"

const findAsset = (
  assets: OpenSeaGetResponse["assets"],
  vault: GetPoolsQuery["vaults"][number]
) => {
  const ret = assets.find(
    (asset) =>
      String(asset.asset_contract.address) === String(vault.nftAddress) &&
      String(asset.token_id) === String(vault.tokenId)
  )
  return ret
}

const parseSubgraphVaults = async (vaults: GetPoolsQuery["vaults"]) => {
  const { assets } = await openseaGetMany(vaults)
  const poolData: Pool[] = _.map(vaults, (vault) => {
    const asset = findAsset(assets, vault)
    return {
      img: (asset?.image_preview_url || asset?.image_url) ?? "",
      nonce: vault.nonce || 0,
      state:
        vault.status === 0
          ? PoolStatus.Normal
          : vault.status === 1
          ? PoolStatus.Auction
          : PoolStatus.Closed,
      collectionTitle: asset?.asset_contract.name ?? "",
      nftName: asset?.name ?? "",
      address: vault.nftAddress,
      tokenId: vault.tokenId,
      vaultAddress: vault.id,
      emissionsStarted: vault.emissionsSigned,
      size: BigNumber.from(vault.size),
      totalParticipants: vault.totalParticipants,
      tickets: vault.tickets,
    }
  })
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
  useSelector<AppState, { uv: number; date: number }[]>((state) =>
    tokenLockHistorySelector(state, vaultId)
  )
