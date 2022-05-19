import { BigNumber } from "ethers"
import { VeAllocation } from "../models"

export const allocations: VeAllocation[] = [
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xdeds",
    amount: BigNumber.from("1231250000000000000000"),
  },
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xdeddds",
    amount: BigNumber.from("1231250000000000000000"),
  },
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xded23s",
    amount: BigNumber.from("1231250000000000000000"),
  },
]
