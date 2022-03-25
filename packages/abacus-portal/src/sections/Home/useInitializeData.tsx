import { usePrevious } from "@hooks/index"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { useEffect, useRef } from "react"

function useInitializeData(initializer: () => void) {
  const isInitializedRef = useRef(false)
  const networkSymbol = useGetCurrentNetwork()
  const prevNetworkSymbol = usePrevious(networkSymbol)
  const isNewNetwork = networkSymbol !== prevNetworkSymbol

  useEffect(() => {
    if (isNewNetwork) {
      isInitializedRef.current = false
    }

    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      initializer()
    }
  }, [initializer, isNewNetwork])
}

export default useInitializeData
