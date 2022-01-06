import { configureStore } from "@reduxjs/toolkit"
import application from "./application/reducer"
import poolData from "./poolData/reducer"
import singlePoolData from "./singlePoolData/reducer"
import transactions from "./transactions/reducer"
import miscData from "./miscData/reducer"

const store = configureStore({
  reducer: {
    application,
    singlePoolData,
    poolData,
    transactions,
    miscData,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
