import { useQuery } from "urql"
import { GetPoolsDocument } from "abacus-graph"
import { PoolCardProps } from "@components/PoolCard"
import { matchOpenSeaAssetToNFT, openseaGetMany } from "abacus-utils"
import { useEffect, useState } from "react"
import { BigNumber } from "@ethersproject/bignumber"

const OpenSeaURL = process.env.GATSBY_OPENSEA_API

const usePools = (): PoolCardProps[] => {
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const [result] = useQuery({
    query: GetPoolsDocument,
    variables: { first: 20, skip: 0, where: null },
  })

  const { data } = result

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
              poolSize: BigNumber.from("0").toString(),
            }
          }) ?? null
        if (mappedPools) {
          setPools(mappedPools)
        }
      }
    }
    getMetadata()
  }, [data])

  return pools
}

export { usePools }
