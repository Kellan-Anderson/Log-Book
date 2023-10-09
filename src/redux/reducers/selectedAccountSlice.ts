import { generateId } from "@/lib/helpers";
import { account, transaction } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PartialTransaction = {
  type: 'withdraw' | 'deposit',
  amount: number,
  budgetArea: string,
  id?: string,
  notes?: string,
  date?: Date
}

const initialState: account = {
  budgets: [],
  transactions: [],
  name: ''
}

const selectedAccountSlice = createSlice({
  initialState,
  name: 'selectedAccountSlice',
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<account>) => action.payload,

    addTransaction: (state, action: PayloadAction<PartialTransaction>) => {
      const { amount, budgetArea, type, date, id, notes } = action.payload;
      
      const newTransaction: transaction = {
        amount,
        budgetArea,
        type,
        notes,
        date: date ?? new Date(),
        id: id ?? generateId({prefix: 'tr-'})
      }

      return {
        ...state,
        transactions: [...state.transactions, newTransaction]
      }
    }
  },

});

export const { setSelectedAccount } = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;