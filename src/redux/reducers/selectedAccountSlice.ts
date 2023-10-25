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
      const budgetExists = state.budgets.findIndex(b => b.id === action.payload.id);
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
    },
    editBudget: (state, action: PayloadAction<budget>) => {
      const { id } = action.payload;
      const budgetExistsIndex = state.budgets.findIndex(b => b.id === id);

      if(budgetExistsIndex !== -1) {
        const newBudgets = state.budgets.map(b => {
          if(b.id === id) {
            return action.payload
          }
          return b
        });
        return {
          ...state,
          budgets: [...newBudgets]
        }
      }
      return {...state}
    },
    deleteBudget: (state, action: PayloadAction<budget>) => {
      const { id } = action.payload;
      const newBudgets = state.budgets.filter(b => b.id !== id);
      return {
        ...state,
        budgets: newBudgets
      }
    }
  },

});

export const { 
  addTransaction,
  addBudget,
  deleteBudget,
  editBudget,
  setSelectedAccount,
} = selectedAccountSlice.actions;
export default selectedAccountSlice.reducer;