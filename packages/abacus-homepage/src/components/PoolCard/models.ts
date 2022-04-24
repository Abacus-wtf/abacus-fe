import { BigNumber } from "@ethersproject/bignumber"

export type PoolCardProps = {
  id: string
  imgSrc: string
  alt?: string
  poolName: string
  poolSize: BigNumber
}
