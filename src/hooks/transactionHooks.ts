import { months, transaction } from "@/types";

export function useTransactions() {
  const now = new Date();

  const getThisMonthsTransactions = (transactions: transaction[]) => {
    const dateLimit = new Date(`${now.getMonth() + 1} 1 ${now.getFullYear()}`);
    return transactions.filter(t => new Date(t.date) > dateLimit);
  }

  const getThisYearsTransactions = (transactions: transaction[]) => {
    const dateLimit = new Date(`Jan 1 ${now.getFullYear()}`);
    return transactions.filter(t => new Date(t.date) > dateLimit);
  }

  const getTransactionsByMonth = (transactions: transaction[], month: months) => {
    const monthsTransactions = transactions.filter(t => {
      const dateLimitStart = new Date(`${month} 1 ${now.getFullYear()}`);
      const dateLimitEnd = new Date(`${month} 1 ${now.getFullYear()}`);
      dateLimitEnd.setMonth(dateLimitStart.getMonth() + 1);
      const transactionDate = new Date(t.date);
      return transactionDate > dateLimitStart && transactionDate < dateLimitEnd
    });

    return monthsTransactions;
  }

  return {
    getThisMonthsTransactions,
    getThisYearsTransactions,
    getTransactionsByMonth
  };
}