import { account } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: account[] = [];


const SpendingSlice = createSlice({
  name: 'Spending',
  initialState,
  reducers: {
    setInitialAccounts: (_state, action: PayloadAction<account[]>) => action.payload,

    addAccount: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const nameIndex = state.findIndex(acc => acc.name === name);
      if(nameIndex === -1) {
        const newAccount: account = {
          name,
          budgets: [],
          transactions: []
        }
        return [...state, newAccount]
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