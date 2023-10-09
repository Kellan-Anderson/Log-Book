import { configureStore } from "@reduxjs/toolkit"
import spendingSlice from "./reducers/spendingSlice";
import selectedAccountSlice from "./reducers/selectedAccountSlice";

export const store = configureStore({
  reducer: {
    spending: spendingSlice,
    selectedAccount: selectedAccountSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;