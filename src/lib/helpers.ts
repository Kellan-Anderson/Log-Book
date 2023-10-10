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

  return transactions.filter(t => new Date(t.date) > earlier );
}

export function generateId(
  { length = 5, prefix = '' } : {length?: number, prefix?: string}
) {
  const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
  let id = '';
  for(let i = 0; i < length; i++) {
    const randChar = key[Math.floor(Math.random() * key.length)]
    id = id + randChar;
  }
  return prefix + id;
}