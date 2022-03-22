import { ValidationFn } from "@hooks/useValidate"

export const initialAppraisalChecks: ValidationFn<string>[] = [
  (a) =>
    Number(a) <= 0
      ? {
          valid: false,
          message: `Initial appraisal must be greater than 0`,
        }
      : { valid: true },
]

export const votingTimeChecks: ValidationFn<string>[] = [
  (t) =>
    Number(t) <= 0
      ? {
          valid: false,
          message: `Voting time must be greater than 0hrs`,
        }
      : { valid: true },
  (t) =>
    Number(t) > 24
      ? {
          valid: false,
          message: `Voting time must be less than 24hrs`,
        }
      : { valid: true },
]
