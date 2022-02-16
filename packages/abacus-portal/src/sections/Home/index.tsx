import React, { useState, useEffect, useRef } from "react"
import {
  useGetMultiSessionData,
  useMultiSessionState,
} from "@state/sessionData/hooks"
import { PromiseStatus } from "@models/PromiseStatus"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { usePrevious } from "@hooks/index"
import { NetworkSymbolEnum } from "@config/constants"
import styled from "styled-components"

const BigThing = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12rem;
`

const Home: React.FC = () => {
  const isInitializedRef = useRef(false)
  const getMultiSessionData = useGetMultiSessionData()
  const { multiSessionData, fetchStatus, isLastPage } = useMultiSessionState()
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<string | null>(null)
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const isLoading = fetchStatus === PromiseStatus.Pending
  const networkSymbol = useGetCurrentNetwork()
  const prevNetworkSymbol = usePrevious(networkSymbol)
  const isNewNetwork = networkSymbol !== prevNetworkSymbol
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE

  useEffect(() => {
    if (isNewNetwork) {
      isInitializedRef.current = false
    }

    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      getMultiSessionData(null)
    }
  }, [getMultiSessionData, isNewNetwork])

  return <BigThing>Hi</BigThing>
}

export default Home
