import { openseaGetMany, matchOpenSeaAssetToNFT } from "abacus-utils"
import { formatEther } from "ethers/lib/utils"

export type Session = {
  id: string
  imgSrc: string
  title: string
  bounty: number
  participants: number
  appraisal: number
}

const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API || ""

export const mapSessions = async (
  pricingSessions: any[]
): Promise<Session[]> => {
  console.log(OPENSEA_LINK)
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
      }
    }
  )
}
