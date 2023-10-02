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
    addAccount: (state, action: PayloadAction<account>) => [ ...state, action.payload ],
    deleteAccount: (state, action: PayloadAction<string>) => {
      return state.filter(account => account.name !== action.payload)
    },
    editAccount: (state, action: PayloadAction<account>) => {
      const newAccounts = state.map(account => {
        if(account.name === action.payload.name) {
          return action.payload
        } else {
          return account
        }
      });
      return newAccounts;
    },
    addTransaction: (state, action: PayloadAction<accountTransactionIdentifier>) => {
      return state.map((account) => {
        if(account.name === action.payload.accountName) {
          return {
            name: account.name,
            transactions: [...account.transactions, action.payload.transaction]
          }
        }
        return account;
      });
    },
    deleteTransaction: (state, action: PayloadAction<{
      accountName: string,
      transactionId: string
    }>) => {
      const clonedAccounts = [...state];
      const accountToChangeIndex = clonedAccounts.findIndex(acc => acc.name === action.payload.accountName);
      if(accountToChangeIndex >= 0) {
        const account = clonedAccounts[accountToChangeIndex];
        account.transactions = account.transactions.filter(t => t.id !== action.payload.transactionId);
        clonedAccounts[accountToChangeIndex] = account;
      }
      return clonedAccounts;
    },
    editTransaction: (state, action: PayloadAction<{
      accountName: string,
      transaction: transaction
    }>) => {
      const { transaction } = action.payload;
      return state.map(acc => {
        if(acc.name === action.payload.accountName) {
          const editedTransactions = acc.transactions.map(t => t.id === transaction.id ? transaction : t);
          return {
            name: acc.name,
            transactions: editedTransactions
          }
        }
        return acc
      });
    }
  }
});

export const { addAccount, deleteAccount, setInitialAccounts } = SpendingSlice.actions
export default SpendingSlice.reducer;