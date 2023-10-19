import z from 'zod';

export type PartialTransaction = {
  type: 'withdraw' | 'deposit',
  amount: number,
  budgetArea: string,
  id?: string,
  notes?: string,
  date?: string
}

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.coerce.number(),
  type: z.enum(['withdraw', 'deposit']),
  budgetArea: z.string(),
  notes: z.string().optional()
});
export type transaction = z.infer<typeof transactionSchema>

export const budgetSchema = z.object({
  name: z.string(),
  alloted: z.coerce.number().optional(),
  description: z.string().optional(),
  color: z.string(),
  icon: z.string().emoji().max(1).transform(e => e === '' ? undefined : e).optional()
});
export type budget = z.infer<typeof budgetSchema>;

export const accountSchema = z.object({
  name: z.string(),
  transactions: transactionSchema.array(),
  budgets: budgetSchema.array()
})
export type account = z.infer<typeof accountSchema>

export type months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

export type ReportType = {
  spent: number,
  budgeted: number | undefined,
  difference: number | undefined
}

export type BudgetReport = {
  monthReport: ReportType,
  yearToDate: ReportType,
  annualReport: {
      annualBudget: number | undefined;
      remaining: number | undefined;
  },
  other: {
      averageSpentPerMonth: number;
  },
}


export const timePunchSchema = z.object({
  timeIn: z.date(),
  timeOut: z.date().nullable(),
  lunchOut: z.date().optional(),
  lunchIn: z.date().optional(),
  notes: z.string().optional(),  
})
export type timePunch = z.infer<typeof timePunchSchema>

export const jobSchema = z.object({
  name: z.string(),
  punches: timePunchSchema.array(),
})
export type job = z.infer<typeof jobSchema>

export const caloriesSchema = z.object({
  food: z.string(),
  calories: z.coerce.number()
}).array();
export type calories = z.infer<typeof caloriesSchema>