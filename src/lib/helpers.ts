import { transaction } from "@/types";

export function getNPreviousTransactions(transactions: transaction[], numTransactions: number = 5) {
  const { length } = transactions;
  return transactions.slice(length - numTransactions, length);
}

export function getTotalDeposit(transactions: transaction[]) {
  let sum = 0;
  transactions.forEach(t => {
    if(t.type === 'deposit') {
      sum += t.amount
    }
  });
  return sum;
}

export function getTotalWithdraw(transactions: transaction[]) {
  let sum = 0;
  transactions.forEach(t => {
    if(t.type === 'withdraw') {
      sum += t.amount
    }
  });
  return sum;
}

export function getLastNDays(transactions: transaction[], numDays: number = 5) {
  const now = new Date();
  const earlier = new Date();
  earlier.setDate(now.getDate() - numDays);

  return transactions.filter(t => t.date > earlier );
}