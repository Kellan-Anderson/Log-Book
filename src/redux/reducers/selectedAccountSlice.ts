import { generateId } from "@/lib/helpers";
import { account, budget, transaction } from "@/types";
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
    },

    addBudget: (state, action: PayloadAction<budget>) => {
      const budgetExists = state.budgets.findIndex(b => b.name === action.payload.name);
      if(budgetExists === -1) {
        return {
          ...state,
          budgets: [
            ...state.budgets,
            action.payload
          ]
        }
      }
      return {...state}
    }
  },

});

export const { addTransaction, setSelectedAccount, addBudget } = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;