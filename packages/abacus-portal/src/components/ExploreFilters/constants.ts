import { SessionState } from "@state/sessionData/reducer"
import { BigNumber } from "ethers"
import { parseEther } from "ethers/lib/utils"

export const statuses = [
  {
    label: "Vote",
    state: SessionState.Vote,
  },
  {
    label: "Weigh",
    state: SessionState.Weigh,
  },
  {
    label: "Set Final",
    state: SessionState.SetFinalAppraisal,
  },
  {
    label: "Harvest",
    state: SessionState.Harvest,
  },
  {
    label: "Claim",
    state: SessionState.Claim,
  },
  {
    label: "Complete",
    state: SessionState.Complete,
  },
]

export type Order = "asc" | "desc" | null

export type Range = "low_range" | "mid_range" | "high_range"

export const RangeBoundaries: Record<
  Range,
  { lower_bound: BigNumber; upper_bound: BigNumber | number }
> = {
  low_range: {
    lower_bound: parseEther("0"),
    upper_bound: parseEther("0.1"),
  },
  mid_range: {
    lower_bound: parseEther("0.1"),
    upper_bound: parseEther("1"),
  },
  high_range: {
    lower_bound: parseEther("1"),
    upper_bound: Infinity,
  },
}
