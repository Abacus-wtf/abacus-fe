import { SessionState } from "@state/sessionData/reducer"

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

export type Order = "lth" | "htl" | null

export type Range = "low_range" | "mid_range" | "high_range"
