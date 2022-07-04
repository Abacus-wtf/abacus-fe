import { useQuery } from "urql"
import { GetPoolsDocument } from "abacus-graph"
import { PoolCardProps } from "@components/PoolCard"
import { useEffect, useState } from "react"
import { mapPoolsFromGraph } from "helpers"

const usePools = () => {
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const [result] = useQuery({
    query: GetPoolsDocument,
    variables: { first: 3, skip: 0, where: { status_lt: 3 } },
  })

  const { data, fetching } = result

  useEffect(() => {
    const getMetadata = async () => {
      const vaults = data?.vaults

      const mappedPools = await mapPoolsFromGraph(vaults, fetching)
      if (mappedPools) {
        setPools(mappedPools)
      }
    }
    getMetadata()
  }, [data, fetching])

  return { pools, fetching }
}

export { usePools }
