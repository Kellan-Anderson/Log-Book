import { transaction } from "@/types";

export function getNPreviousTransactions(transactions: transaction[], numTransactions: number = 5) {
  const { length } = transactions;
  return transactions.slice(length - numTransactions, length);
}

export function getTotals(transactions: transaction[], type: 'withdraw' | 'deposit') {
  const amounts = transactions.filter(t => t.type === type).map(t => t.amount);
  const total = amounts.reduce((total, value) => total + value, 0);
  return total;
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
export const twColors = [
  'slate',
  'zinc',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
];

export const twIntensities = [
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
]


export function getRandomTailwindColor() {

  const randColor = Math.floor(Math.random() * twColors.length);
  const randIntensity = Math.floor(Math.random() * twIntensities.length);

  return `${twColors[randColor]}-${twIntensities[randIntensity]}`
}