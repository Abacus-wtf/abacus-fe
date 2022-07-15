import { useActivity } from "@state/singlePoolData/hooks"
import React, { FunctionComponent } from "react"
import { ActivitySection } from "@components/index"

const Activity: FunctionComponent = () => {
  const activity = useActivity()

  const mapped = activity?.map((item) => ({
    ...item,
    description: `${item.amount} Token ${item.action}
    ${
      item.action === "purchase"
        ? ` with a lockup period of ${item.length} epoch${
            item?.length ?? 0 > 1 ? "s" : ""
          }`
        : ""
    }`,
  }))

  return <ActivitySection activity={mapped} />
}

export default Activity
