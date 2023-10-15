import { BudgetCard } from "@/components/ui/budget-components";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/redux/redux-hooks";
import { testData } from "@/testData";
import { budget } from "@/types";

export default function BudgetArea() {

  const { budgets } = useAppSelector(state => state.selectedAccount);

  /*
    Items to display in budget area:
      - List of all budgets. Each Item should display:
        -> Amount spent in that budget
        -> Amount remaining in that budget (if applicable)
        -> Budget icon
        -> Budget color
        -> Budget Details Dropdown
      - Pie graph showing breakdown of budgets
      - Pie graph showing breakdown of amount spent in budgets
      - Details for all budgets

  */

  return (
    <>
      <Card className="w-2/3 h-full p-2">
        {testData.budgets.map(b => <BudgetCard budgetItem={b} key={b.name} />)}
      </Card>
      <div className="absolute right-0 top-0 w-1/3 h-screen flex flex-col pr-4">
        <div className="sticky grow border border-red-500"></div>
        <div className="sticky grow border border-red-500"></div>
      </div>
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