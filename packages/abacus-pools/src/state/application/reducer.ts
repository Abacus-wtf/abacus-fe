import { createReducer } from "@reduxjs/toolkit"
import { NetworkSymbolEnum } from "@config/constants"
import { ReactNode } from "react"
import {
  toggleWalletModal,
  selectNetwork,
  setGeneralizedContractErrorMessage,
  setEthToUSD,
  setAbcBalance,
} from "./actions"

type GeneralizedContractState = {
  errorMessage: string | null | ReactNode
}
interface ApplicationState {
  isWalletModalOpen: boolean
  networkSymbol: NetworkSymbolEnum | null
  generalizedContract: GeneralizedContractState
  ethToUSD: number
  abcBalance: number
}

export const initialState: ApplicationState = {
  isWalletModalOpen: false,
  networkSymbol: null,
  generalizedContract: {
    errorMessage: null,
  },
  ethToUSD: null,
  abcBalance: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleWalletModal, (state, action) => {
      state.isWalletModalOpen = action.payload
    })
    .addCase(selectNetwork, (state, action) => {
      state.networkSymbol = action.payload
    })
    .addCase(setGeneralizedContractErrorMessage, (state, action) => {
      state.generalizedContract.errorMessage = action.payload
    })
    .addCase(setEthToUSD, (state, action) => {
      state.ethToUSD = action.payload
    })
    .addCase(setAbcBalance, (state, action) => {
      state.abcBalance = action.payload
    })
)
