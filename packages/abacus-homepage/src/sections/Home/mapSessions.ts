import {
  openseaGetMany,
  matchOpenSeaAssetToNFT,
  shortenAddress,
} from "abacus-utils"
import { formatEther } from "ethers/lib/utils"
import { Session, SubgraphPricingSession } from "@models/index"

const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API || ""

export const mapSessions = async (
  pricingSessions: SubgraphPricingSession[]
): Promise<Session[]> => {
  const { assets } = await openseaGetMany(pricingSessions, {
    url: OPENSEA_LINK,
  })

  return pricingSessions.map(
    ({
      id,
      bounty,
      numParticipants,
      finalAppraisalValue,
      nftAddress,
      tokenId,
    }) => {
      const asset = matchOpenSeaAssetToNFT(assets, { nftAddress, tokenId })
      return {
        id,
        title: asset?.asset_contract.name ?? "",
        imgSrc: (asset?.image_preview_url || asset?.image_url) ?? "",
        bounty: Number(Number(formatEther(bounty)).toPrecision(4)),
        participants: numParticipants,
        appraisal: Number(
          Number(formatEther(finalAppraisalValue)).toPrecision(4)
        ),
        owner: asset?.owner?.user
          ? asset?.owner?.user?.username ??
            shortenAddress(asset?.owner?.address)
          : "",
      }
    }
  )
}
