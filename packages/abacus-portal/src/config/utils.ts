import { getAddress } from "@ethersproject/address"
import { OPENSEA_API_KEY, OPENSEA_LINK, web3Eth } from "@config/constants"
import { BigNumber } from "@ethersproject/bignumber"
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import { AddressZero } from "@ethersproject/constants"
import { keccak256 } from "@ethersproject/keccak256"
import { formatEther } from "ethers/lib/utils"
import "whatwg-fetch"
import _ from "lodash"

export const formatPricingSessionCoreMulticall = (pricingSessionCore: any) => ({
  endTime: parseInt(pricingSessionCore[0].hex, 16),
  bounty: Number(formatEther(pricingSessionCore[1])),
  keeperReward: Number(formatEther(pricingSessionCore[2])),
  lowestStake: Number(formatEther(pricingSessionCore[3])),
  maxAppraisal: Number(formatEther(pricingSessionCore[4])),
  totalAppraisalValue: Number(formatEther(pricingSessionCore[5])),
  totalSessionStake: Number(formatEther(pricingSessionCore[6])),
  totalProfit: Number(formatEther(pricingSessionCore[7])),
  totalWinnerPoints: parseInt(pricingSessionCore[8].hex, 16),
  totalVotes: parseInt(pricingSessionCore[9].hex, 16),
  uniqueVoters: parseInt(pricingSessionCore[10].hex, 16),
  votingTime: parseInt(pricingSessionCore[11].hex, 16),
})

export const formatPricingSessionCheckMulticall = (
  pricingSessionCheck: any
) => ({
  revealedStake: `${parseInt(pricingSessionCheck[0].hex, 16)}`,
  sessionProgression: `${parseInt(pricingSessionCheck[1].hex, 16)}`,
  calls: `${parseInt(pricingSessionCheck[2].hex, 16)}`,
  correct: `${parseInt(pricingSessionCheck[3].hex, 16)}`,
  incorrect: `${parseInt(pricingSessionCheck[4].hex, 16)}`,
  defender: `${parseInt(pricingSessionCheck[5].hex, 16)}`,
  spread: `${parseInt(pricingSessionCheck[6].hex, 16)}`,
  riskFactor: `${parseInt(pricingSessionCheck[7].hex, 16)}`,
  finalStdev: `${formatEther(pricingSessionCheck[8].hex)}`,
  secondaryPoints: `${parseInt(pricingSessionCheck[9].hex, 16)}`,
})

export function isWithinWinRange(
  appraisal: number,
  finalAppraisal: number,
  winnerAmount: number
) {
  if (winnerAmount === 0.05) {
    return (
      appraisal >= finalAppraisal * 0.95 && appraisal <= finalAppraisal * 1.05
    )
  }
  return (
    appraisal >= finalAppraisal - Number(winnerAmount) &&
    appraisal <= finalAppraisal + Number(winnerAmount)
  )
}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    return ""
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const genRanHex = (size: number) => {
  const randomArray = crypto.getRandomValues(new Uint8Array(size))
  const hexVals = _.map(randomArray, (buffer) =>
    buffer.toString(16).padStart(2, "0")
  ).join("")
  return hexVals
}

export type OpenSeaAsset = {
  image_preview_url?: string
  image_url: string
  animation_url: string | null
  asset_contract: {
    name: string
    address: string
  }
  collection: {
    name: string
    slug: string
    payment_tokens: {
      address: string
      decimals: number
      eth_price: number
      id: number
      image_url: string
      name: string
      symbol: string
      usd_price: string
    }[]
  }
  traits: {
    trait_type: string
    value: number | string
    display_type: string
    max_value: string
    trait_count: number
    order: number
  }[]
  creator: {
    user: {
      username: string
    }
    profile_img_url: string
    address: string
    config: string
  }
  token_id: string
  name: string
  owner?: {
    address: string
    user?: {
      username: string
    }
  }
  permalink: string
}

const DEFAULT_ASSET: OpenSeaAsset = {
  image_url: "",
  animation_url: "",
  permalink: "",
  asset_contract: {
    name: "",
    address: "",
  },
  traits: [],
  creator: {
    user: {
      username: null,
    },
    profile_img_url: "",
    address: "",
    config: "",
  },
  collection: {
    name: "",
    slug: "",
    payment_tokens: [],
  },
  token_id: "",
  name: "",
}

export type OpenSeaGetResponse = {
  assets: OpenSeaAsset[]
}

type OpenSeaQueryParams = {
  collection_slug?: string
  asset_contract_address?: string
}

export async function openseaGet<T = OpenSeaAsset>(
  input: string,
  query?: OpenSeaQueryParams
) {
  let result: T
  try {
    const queryParams = query
      ? Object.keys(query).reduce(
          (acc, q, i) => `${acc}${i === 0 ? "" : "&"}${q}=${query[q]}`,
          "?"
        )
      : ""
    const url = `${OPENSEA_LINK}${input}${queryParams}`
    const res = await fetch(url, {
      headers: {
        ...(OPENSEA_API_KEY ? { "X-API-KEY": OPENSEA_API_KEY } : {}),
      },
    })
    result = await res.json()
    return result
  } catch (e) {
    console.log("e", e)
    return DEFAULT_ASSET
  }
}

function isOpenSeaAsset(
  asset: OpenSeaAsset | OpenSeaGetResponse
): asset is OpenSeaAsset {
  return (asset as OpenSeaAsset).token_id !== undefined
}

export type OpenSeaGetManyParams = { nftAddress: string; tokenId: string }[]

export async function openseaGetMany(pricingSessions: OpenSeaGetManyParams) {
  const URL = `assets?${pricingSessions
    .map((session) => `asset_contract_addresses=${session.nftAddress}&`)
    .toString()}${pricingSessions
    .map((session) => `token_ids=${session.tokenId}&`)
    .toString()}`
  const result = await openseaGet<OpenSeaGetResponse>(URL.replaceAll(",", ""))
  if (isOpenSeaAsset(result)) {
    const DEFAULT_OPENSEA_GET_RESPONSE: OpenSeaGetResponse = {
      assets: pricingSessions.map((session) => ({
        ...DEFAULT_ASSET,
        asset_contract: { ...DEFAULT_ASSET, address: session.nftAddress },
        token_id: session.tokenId,
      })),
    }
    return DEFAULT_OPENSEA_GET_RESPONSE
  }
  return result
}

export async function openseaGetRelated(
  input: string,
  query: OpenSeaQueryParams
) {
  const result = await openseaGet<{ assets: OpenSeaAsset[] }>(input, query)
  if (isOpenSeaAsset(result)) {
    return { assets: [] }
  }
  return result
}

export function hashValues({
  appraisalValue,
  account,
  password,
}: {
  appraisalValue: BigNumber
  account: string
  password: any
}) {
  let encodedParams = web3Eth.eth.abi.encodeParameters(
    ["uint", "address", "uint"],
    [appraisalValue, account, password]
  )
  encodedParams =
    encodedParams.slice(0, 64) + encodedParams.slice(88, encodedParams.length)
  return keccak256(encodedParams)
}

export function encodeSessionData({
  account,
  nftAddress,
  nonce,
  tokenId,
}: {
  account: string
  nftAddress: string
  nonce: number
  tokenId: string
}) {
  if (!account) {
    return ""
  }
  return web3Eth.eth.abi.encodeParameters(
    ["uint", "address", "address", "uint"],
    [nonce, nftAddress, account, tokenId]
  )
}

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000))
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  )
}
