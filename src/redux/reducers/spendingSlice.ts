import { account, transaction } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: account[] = [];

type accountTransactionIdentifier = {
  accountName: string,
  transaction: transaction
}

const SpendingSlice = createSlice({
  name: 'Spending',
  initialState,
  reducers: {
    setInitialAccounts: (state, action: PayloadAction<account[]>) => action.payload,

    addAccount: (state, action: PayloadAction<account>) => {
      const { name } = action.payload;
      const nameIndex = state.findIndex(acc => acc.name === name);
      if(nameIndex !== -1) {
        return [...state, action.payload]
      }
      return [...state]
    },

    deleteAccount: (state, action: PayloadAction<string>) => {
      return state.filter(acc => acc.name !== action.payload)
    },

    changeAccount: (state, action: PayloadAction<account>) => {
      const { name } = action.payload;
      return state.map(acc => {
        if(acc.name === name) {
          return action.payload
        }
        return acc
      });
    }
  }
});

export const { addAccount, changeAccount, deleteAccount, setInitialAccounts } = SpendingSlice.actions
export default SpendingSlice.reducer;