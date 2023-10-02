import z from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  date: z.date(),
  amount: z.number(),
  type: z.enum(['withdraw', 'deposit']),
  notes: z.string().optional()
});
export type transaction = z.infer<typeof transactionSchema>

export const accountSchema = z.object({
  name: z.string(),
  transactions: transactionSchema.array()
})
export type account = z.infer<typeof accountSchema>

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
  calories: z.number()
}).array();
export type calories = z.infer<typeof caloriesSchema>