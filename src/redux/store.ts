import { configureStore } from "@reduxjs/toolkit"
import spendingSlice from "./reducers/spendingSlice";

export const store = configureStore({
  reducer: {
    spending: spendingSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;