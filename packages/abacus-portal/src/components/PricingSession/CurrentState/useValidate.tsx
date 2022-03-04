import { useEffect, useState } from "react"

type Valid = {
  valid: boolean
  message?: string
}

export type ValidationFn<V> = (value: V) => Valid

const INITIAL_VALID: Valid = {
  valid: true,
  message: "",
}

function useValidate<T>(value: T, checks: ValidationFn<T>[]) {
  const [valid, setValid] = useState(INITIAL_VALID)

  useEffect(() => {
    if ((typeof value === "string" && value === "") || value === null) {
      setValid(INITIAL_VALID)
    } else {
      const nextValid = checks.reduce((acc, check) => {
        if (!acc.valid) {
          return acc
        }
        return check(value)
      }, INITIAL_VALID)
      setValid(nextValid)
    }
  }, [checks, value])

  return valid
}

export default useValidate
