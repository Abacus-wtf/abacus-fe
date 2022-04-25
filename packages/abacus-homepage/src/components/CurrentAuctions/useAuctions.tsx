import { useQuery } from "urql"
import { GetPoolsDocument } from "abacus-graph"
import { PoolCardProps } from "@components/PoolCard"
import { matchOpenSeaAssetToNFT, openseaGetMany } from "abacus-utils"
import { useEffect, useState } from "react"

const OpenSeaURL = process.env.GATSBY_OPENSEA_API

const useAuctions = () => {
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const [result] = useQuery({
    query: GetPoolsDocument,
    variables: { first: 3, skip: 0, where: { status: 3 } },
  })

  const { data, fetching } = result

  useEffect(() => {
    const getMetadata = async () => {
      const vaults = data?.vaults ?? null
      if (vaults) {
        const { assets } = await openseaGetMany(data.vaults, {
          url: OpenSeaURL,
        })

        const mappedPools: PoolCardProps[] =
          data?.vaults.map((vault) => {
            const asset = matchOpenSeaAssetToNFT(assets, vault)

            return {
              id: vault.id,
              imgSrc: asset.image_url,
              alt: `${asset.name} in NFT Collection: ${asset.collection}`,
              poolName: asset.name,
              poolSize: String(vault.size),
              link: `${process.env.GATSBY_APP_URL}/pool/?address=${vault.nftAddress}&tokenId=${vault.tokenId}&nonce=${vault.nonce}`,
              fetching,
            }
          }) ?? null
        if (mappedPools) {
          setPools(mappedPools)
        }
      }
    }
    getMetadata()
  }, [data, fetching])

  return { pools, fetching }
}

export { useAuctions }
