import { IS_PRODUCTION } from "@config/constants"

export const customDurationConfig = IS_PRODUCTION
  ? {
      min: 15,
      max: 90,
    }
  : { min: Number(12 / 60), max: 6 }

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
        label: "12 Hours",
        id: "12_hour_duration",
        value: "0.5",
      },
      {
        label: "24 Hours",
        id: "24_hour_duration",
        value: "1",
      },
      {
        label: "3 Days",
        id: "3_day_duration",
        value: "3",
      },
      {
        label: "6 Days",
        id: "6_day_duration",
        value: "6",
      },
    ]
