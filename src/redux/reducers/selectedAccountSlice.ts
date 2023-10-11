import { generateId } from "@/lib/helpers";
import { account, transaction } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PartialTransaction } from "@/types"

const initialState: account = {
  budgets: [],
  transactions: [],
  name: ''
}

const selectedAccountSlice = createSlice({
  initialState,
  name: 'selectedAccountSlice',
  reducers: {
    setSelectedAccount: (_state, action: PayloadAction<account>) => action.payload,

    addTransaction: (state, action: PayloadAction<PartialTransaction>) => {
      const { amount, budgetArea, type, date, id, notes } = action.payload;
      
      // const amount = parseInt(action.payload.amount);
      const dateString = date?.toString() ?? new Date().toString();
      
      const newTransaction: transaction = {
        amount,
        budgetArea,
        type,
        notes,
        date: dateString,
        id: id ?? generateId({prefix: 'tr-'})
      }
      
      return {
        ...state,
        transactions: [...state.transactions, newTransaction]
      }
    }
  },

});

export const { addTransaction, setSelectedAccount } = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;