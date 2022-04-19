import { IS_PRODUCTION } from "@config/constants"

export const customDurationConfig = IS_PRODUCTION
  ? {
      min: 15,
      max: 90,
    }
  : { min: Number(5 / 24 / 60), max: Number(36 / 24 / 60) }

export const durations = IS_PRODUCTION
  ? [
      {
        label: "15 Days",
        id: "15_day_duration",
        value: "15",
      },
      { label: "21 Days", id: "21_day_duration", value: "21" },
      { label: "30 Days", id: "30_day_duration", value: "30" },
    ]
  : [
      {
        label: "5 Minutes",
        id: "5_minute_duration",
        value: Number(5 / 24 / 60).toString(),
      },
      {
        label: "15 Minutes",
        id: "15_minutes_duration",
        value: Number(15 / 24 / 60).toString(),
      },
      {
        label: "30 Minutes",
        id: "30_minutes_duration",
        value: Number(30 / 24 / 60).toString(),
      },
    ]
