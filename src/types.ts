export type transaction = {
  id: string,
  date: Date,
  amount: number,
  type: 'withdraw' | 'deposit',
  notes?: string
}

export type account = {
  name: string,
  transactions: transaction[]
}

export type timePunch = {
  date: Date,
  timeIn: `${number}:${number}`,
  timeOut: `${number}:${number}`,
  lunchOut?: `${number}:${number}` | null,
  lunchIn?: `${number}:${number}` | null,
  notes?: string
}

export type job = {
  name: string,
  punches: timePunch[]
}

export type calories = {
  food: string,
  calories: number
}[]