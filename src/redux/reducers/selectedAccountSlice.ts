import { account } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: account = {
  budgets: [],
  transactions: [],
  name: 'Initial Account'
}

const selectedAccountSlice = createSlice({
  initialState,
  name: 'selectedAccountSlice',
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<account>) => action.payload
  }
});

export const { setSelectedAccount } = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;