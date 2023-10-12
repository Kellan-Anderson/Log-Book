import { BudgetCard } from "@/components/ui/budget-components";
import { budget } from "@/types";

const fakeData: budget[] = [
  {
    name: 'budget 1',
    spent: 0,
  },
  {
    name: 'budget 2',
    spent: 30,
    alloted: 45
  },
  {
    name: 'budget 3',
    spent: 60,
    description: 'Hello world'
  },
  {
    name: 'budget 4',
    spent: 80,
    alloted: 100,
    description: 'Sup',
    icon: '🎉'
  }
]

export default function BudgetArea() {

  return (
    <>
      {fakeData.map(b => <BudgetCard budgetItem={b} key={b.name} />)}
    </>
  );
}

/**
 * Budgets area should have:
 *  - Way to make a budget
 *  - List of all budgets and spending progress
 *  - Display of progress towards budgets if applicable
 *  - Donut chart w/ total budget difference
 * 
 */