import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import { GRAPHQL_ENDPOINT } from "@config/constants"
import {
  openseaGetMany,
  OpenSeaGetResponse,
  shortenAddress,
} from "@config/utils"
import _ from "lodash"
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

      // @TODO: Once Medici adds nonce and propogating events, replace
      nonce: 0,
      state: PoolStatus.Normal,

      collectionTitle: asset?.asset_contract.name ?? "",
      nftName: asset?.name ?? "",
      address: session.nftAddress,
      tokenId: session.tokenId,
      ownerAddress: asset?.owner?.address ?? "",
      owner:
        asset?.owner?.user && asset?.owner?.user?.username
          ? asset?.owner?.user?.username
          : shortenAddress(asset?.owner?.address),
      vaultAddress: session.id,
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
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    const pools: Pool[] = [
      {
        owner: "0x",
        address: "0xcc14dd8e6673fee203366115d3f9240b079a4930",
        tokenId: "120",
        nonce: 1,
        collectionTitle: "Test",
        nftName: "Dragon",
        ownerAddress: "0x",
        isClosed: false,
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      },
    ]
    dispatch(getMyPools(pools))
  }, [dispatch])
}

const getPoolsSelector = (state: AppState): AppState["poolData"]["pools"] =>
  state.poolData.pools

export const useGetPools = () =>
  useSelector<AppState, AppState["poolData"]["pools"]>(getPoolsSelector)

const getMyPoolsSelector = (state: AppState): AppState["poolData"]["myPools"] =>
  state.poolData.myPools

export const useGetMyPools = () =>
  useSelector<AppState, AppState["poolData"]["myPools"]>(getMyPoolsSelector)
