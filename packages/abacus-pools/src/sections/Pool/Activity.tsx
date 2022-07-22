import { useCurrentPoolActivity } from "@state/singlePoolData/hooks"
import React, { FunctionComponent } from "react"
import { ActivitySection } from "@components/index"

const Activity: FunctionComponent = () => {
  const activites = useCurrentPoolActivity()

  return <ActivitySection activities={activites} />
}

export default Activity
