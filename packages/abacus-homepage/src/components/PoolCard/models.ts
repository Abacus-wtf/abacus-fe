export type PoolCardProps = {
  id: string
  nfts: {
    name: string
    imgSrc: string
    alt?: string
  }[]
  poolName: string
  poolSize: string
  link: string
  fetching: boolean
}
