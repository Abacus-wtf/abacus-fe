import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import { GRAPHQL_ENDPOINT } from "@config/constants"
import { openseaGetMany, OpenSeaGetResponse } from "@config/utils"
import _ from "lodash"
import { useActiveWeb3React } from "@hooks/index"
import { getPools, getMyPools } from "./actions"
import { Pool, PoolStatus } from "./reducer"
import {
  GetVaultQueryResponse,
  GetVaultVariables,
  GET_VAULTS,
  SubgraphVault,
} from "./queries"
import { PAGINATE_BY } from "./constants"

const findAsset = (
  assets: OpenSeaGetResponse["assets"],
  vault: SubgraphVault
) => {
  const ret = assets.find(
    (asset) =>
      String(asset.asset_contract.address) === String(vault.nftAddress) &&
      String(asset.token_id) === String(vault.tokenId)
  )
  return ret
}

const parseSubgraphVaults = async (vaults: SubgraphVault[]) => {
  const { assets } = await openseaGetMany(vaults)
  const poolData: Pool[] = _.map(vaults, (session): Pool => {
    const asset = findAsset(assets, session)
    return {
      img: (asset?.image_preview_url || asset?.image_url) ?? "",
      nonce: session.nonce || 0,
      state:
        session.status === 0
          ? PoolStatus.Normal
          : session.status === 1
          ? PoolStatus.Auction
          : PoolStatus.Closed,
      collectionTitle: asset?.asset_contract.name ?? "",
      nftName: asset?.name ?? "",
      address: session.nftAddress,
      tokenId: session.tokenId,
      vaultAddress: session.id,
      emissionsStarted: false,
    }
  })
  return poolData
}

export const useSetPools = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (where: string | null) => {
      // @TODO: Fix for multipage
      const variables: GetVaultVariables = {
        first: PAGINATE_BY,
        skip: 0 * PAGINATE_BY,
      }

      const { vaults } = await request<GetVaultQueryResponse>(
        GRAPHQL_ENDPOINT,
        GET_VAULTS(where),
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
    const variables: GetVaultVariables = {
      first: PAGINATE_BY,
      skip: 0 * PAGINATE_BY,
    }

    const { vaults } = await request<GetVaultQueryResponse>(
      GRAPHQL_ENDPOINT,
      GET_VAULTS(`{ owner: "${account.toLowerCase()}" }`),
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
