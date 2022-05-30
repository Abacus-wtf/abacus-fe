import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import {
  GetEpochAllocationsDocument,
  GetEpochAllocationsQuery,
  GetEpochAllocationsQueryVariables,
  UserAllocationsDocument,
  UserAllocationsQuery,
  UserAllocationsQueryVariables,
} from "abacus-graph"
import { useActiveWeb3React } from "@hooks/index"
import { GRAPHQL_ENDPOINT } from "@config/constants"
import {
  matchOpenSeaAssetToNFT,
  openseaGetMany,
  OpenSeaGetManyParams,
} from "abacus-utils"
import { VeAllocation } from "@sections/Ve/models"
import { useCallback } from "react"
import { BigNumber } from "ethers"
import { useCurrentEpoch } from "@state/application/hooks"
import { epochAllocationsSelector, userAllocationsSelector } from "./selectors"
import { setEpochAllocations, setUserAllocations } from "./actions"

const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API || ""
const OPENSEA_API_KEY = process.env.GATSBY_OPENSEA_API_KEY

export const useFetchUserAllocations = () => {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const currentEpoch = useCurrentEpoch()

  const fetchUserAllocations = useCallback(async () => {
    if (!currentEpoch || !account) {
      return
    }
    const variables: UserAllocationsQueryVariables = {
      id: account.toLowerCase(),
      where: { epoch: currentEpoch },
    }

    const { user } = await request<UserAllocationsQuery>(
      GRAPHQL_ENDPOINT,
      UserAllocationsDocument,
      variables
    )

    if (!user) {
      dispatch(setUserAllocations([]))
      return
    }

    if (!(user?.allocations.length > 0)) {
      dispatch(setUserAllocations([]))
    }

    const openSeaGetManyParams: OpenSeaGetManyParams = user.allocations.map(
      (allocation) => ({ nftAddress: allocation.collection, tokenId: "1" })
    )

    const { assets } = await openseaGetMany(openSeaGetManyParams, {
      url: OPENSEA_LINK,
      api_key: OPENSEA_API_KEY,
    })

    const allocations: VeAllocation[] = user.allocations.map((allocation) => {
      const asset = matchOpenSeaAssetToNFT(assets, {
        nftAddress: allocation.collection,
        tokenId: "1",
      })
      return {
        name: asset.collection.name,
        imgSrc: asset.image_url,
        address: allocation.collection,
        amount: BigNumber.from(allocation.amount),
      }
    })

    dispatch(setUserAllocations(allocations))
  }, [account, dispatch, currentEpoch])

  return { fetchUserAllocations }
}

export const useFetchEpochAllocations = () => {
  const dispatch = useDispatch()
  const currentEpoch = useCurrentEpoch()

  console.log("CONTOR currentEpoch", currentEpoch)

  const fetchEpochAllocations = useCallback(async () => {
    if (!currentEpoch) {
      return
    }
    const variables: GetEpochAllocationsQueryVariables = {
      where: { epoch: currentEpoch },
    }
    const { epochAllocations } = await request<GetEpochAllocationsQuery>(
      GRAPHQL_ENDPOINT,
      GetEpochAllocationsDocument,
      variables
    )
    if (!epochAllocations) {
      return
    }

    const openSeaGetManyParams: OpenSeaGetManyParams = epochAllocations.map(
      (allocation) => ({ nftAddress: allocation.collection, tokenId: "1" })
    )
    const { assets } = await openseaGetMany(openSeaGetManyParams, {
      url: OPENSEA_LINK,
      api_key: OPENSEA_API_KEY,
    })
    const nextAllocations: VeAllocation[] = epochAllocations.map(
      (allocation) => {
        const asset = matchOpenSeaAssetToNFT(assets, {
          nftAddress: allocation.collection,
          tokenId: "1",
        })
        return {
          name: asset.collection.name,
          imgSrc: asset.image_url,
          address: allocation.collection,
          amount: BigNumber.from(allocation.amount),
        }
      }
    )
    dispatch(setEpochAllocations(nextAllocations))
  }, [dispatch, currentEpoch])

  return { fetchEpochAllocations }
}

export const useUserAllocations = () => useSelector(userAllocationsSelector)
export const useEpochAllocations = () => useSelector(epochAllocationsSelector)
