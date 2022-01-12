import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuctionData, setClaimData } from "./actions"
import { AuctionData } from "./reducer"
import { AppDispatch, AppState } from "../index"
import {
  ETH_USD_ORACLE_ADDRESS,
  ZERO_ADDRESS,
  ABC_AUCTION_ADDRESS,
} from "@config/constants"
import { useWeb3Contract } from "@hooks/index"
import ABC_AUCTION_ABI from "@config/contracts/ABC_AUCTION_ABI.json"
import _ from "lodash"
import { openseaGet, shortenAddress } from "@config/utils"
import axios from "axios"
import { formatEther } from "ethers/lib/utils"
import ABC_PRICING_SESSION_ABI from "@config/contracts/ABC_PRICING_SESSION_ABI.json"
import { ABC_PRICING_SESSION_ADDRESS } from "@config/constants"
import ETH_USD_ORACLE_ABI from "@config/contracts/ETH_USD_ORACLE_ABI.json"

export const useSetAuctionData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getAuctionContract = useWeb3Contract(ABC_AUCTION_ABI)
  const getEthUsdContract = useWeb3Contract(ETH_USD_ORACLE_ABI)

  return useCallback(async () => {
    const auctionContract = getAuctionContract(ABC_AUCTION_ADDRESS)
    const ethUsdOracle = getEthUsdContract(
      ETH_USD_ORACLE_ADDRESS
    )

    let nonce = await auctionContract.methods.nonce().call()
    nonce = Number(nonce)

    const [highestBid, highestBidder, endTime] = await Promise.all([
      auctionContract.methods.highestBid(nonce).call(),
      auctionContract.methods.highestBidder(nonce).call(),
      auctionContract.methods.endTime(nonce).call(),
    ])

    let ethUsd
    try {
      ethUsd = await ethUsdOracle.methods.latestRoundData().call()
      ethUsd = Number(ethUsd.answer)/100000000
    } catch (e) {
      ethUsd = 4500
    }

    const userVote = await auctionContract.methods
      .userVote(nonce, highestBidder)
      .call()
    let optionalInfo
    if (userVote.nftAddress !== ZERO_ADDRESS) {
      const URL = `asset/${userVote.nftAddress}/${userVote.tokenid}`
      const nftMetadata = await openseaGet(URL)

      optionalInfo = {
        img: nftMetadata?.image_url || nftMetadata?.image_preview_url,
        highestBidderAddress: highestBidder,
        highestNftAddress: userVote.nftAddress,
        highestNftTokenId: userVote.tokenid,
        highestNftCollectionTitle: nftMetadata?.collection?.name,
        highestNftName: nftMetadata?.name,
      }
    }

    const auctionData: AuctionData = {
      endTime: Number(endTime) * 1000,
      highestBid: Number(formatEther(highestBid)),
      highestBidDollars: Number(formatEther(highestBid)) * Number(ethUsd),
      optionalInfo,
    }
    dispatch(setAuctionData(auctionData))
  }, [dispatch])
}

export const useSetPayoutData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getPricingSessionContract = useWeb3Contract(ABC_PRICING_SESSION_ABI)

  return useCallback(async (account: string) => {
    const pricingSessionContract = getPricingSessionContract(ABC_PRICING_SESSION_ADDRESS)
    const [ethPayout, ethToAbc] = await Promise.all([
      pricingSessionContract.methods.payoutStored(account).call(),
      pricingSessionContract.methods.ethToAbc().call(),
    ])
    const eth = Number(formatEther(ethPayout))
    const abc = Number(formatEther(ethToAbc * ethPayout))
    dispatch(setClaimData({ethPayout: eth, abcPayout: abc}))
  }, [dispatch])
}

export const useAuctionData = () => {
  return useSelector<AppState, AppState["miscData"]["auctionData"]>(
    state => state.miscData.auctionData
  )
}

export const useClaimPayoutData = () => {
  return useSelector<AppState, AppState["miscData"]["claimPayoutData"]>(
    state => state.miscData.claimPayoutData
  )
}
