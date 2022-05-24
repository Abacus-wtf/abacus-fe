import { useDispatch, useSelector } from "react-redux"
import request from "graphql-request"
import {
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
import { userAllocationsSelector } from "./selectors"
import { setUserAllocations } from "./actions"

const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API || ""
const OPENSEA_API_KEY = process.env.GATSBY_OPENSEA_API_KEY

export const useFetchUserAllocations = () => {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()

  const fetchUserAllocations = useCallback(async () => {
    const variables: UserAllocationsQueryVariables = {
      first: 20,
      skip: 0,
      id: account,
    }
    const { user } = await request<UserAllocationsQuery>(
      GRAPHQL_ENDPOINT,
      UserAllocationsDocument,
      variables
    )

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
  }, [account, dispatch])

  return { fetchUserAllocations }
}

export const useUserAllocations = () => useSelector(userAllocationsSelector)
