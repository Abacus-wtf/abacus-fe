import { Vault } from "abacus-graph"
import {
  matchOpenSeaAssetToNFT,
  openseaGetMany,
  OpenSeaGetManyParams,
} from "abacus-utils"

const OpenSeaURL = process.env.GATSBY_OPENSEA_API

export const mapPoolsFromGraph = async (
  vaults: Vault[],
  fetching?: boolean
) => {
  if (vaults) {
    const INITIAL_NFTS: OpenSeaGetManyParams = []
    const nfts = vaults.reduce((acc, vault) => {
      const nextNfts = vault.nfts.map((nft) => ({
        nftAddress: nft.address,
        tokenId: nft.tokenId,
      }))
      return [...acc, ...nextNfts]
    }, INITIAL_NFTS)
    const { assets } = await openseaGetMany(nfts, {
      url: OpenSeaURL,
    })

    const mappedPools =
      vaults.map((vault) => ({
        id: vault.id,
        nfts: vault.nfts.map((nft) => {
          const asset = matchOpenSeaAssetToNFT(assets, {
            ...nft,
            nftAddress: nft.address,
          })
          return {
            name: asset.name,
            imgSrc: asset.image_url,
            alt: `${asset.name} in NFT Collection: ${asset.collection}`,
          }
        }),
        poolName: "TODO", // TODO: Add vault name in graph
        poolSize: String(vault.size),
        link: `${process.env.GATSBY_APP_URL}/pool/${vault.id}`,
        fetching: fetching ?? false,
      })) ?? null

    return mappedPools
  }
  return []
}
