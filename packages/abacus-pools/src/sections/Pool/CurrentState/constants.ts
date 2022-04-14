import { IS_PRODUCTION } from "@config/constants"

export const customDurationConfig = IS_PRODUCTION
  ? {
      min: 15,
      max: 90,
    }
  : { min: 0.5, max: 7 }

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
        id: "5_hour_duration",
        value: "0.00347222222",
      },
      {
        label: "12 Hours",
        id: "12_hour_duration",
        value: "0.5",
      },
      { label: "2 Days", id: "2_day_duration", value: "2" },
      { label: "7 Days", id: "7_day_duration", value: "7" },
    ]
