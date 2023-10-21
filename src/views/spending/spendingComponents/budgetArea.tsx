import { AddBudgetDialog, BudgetCard } from "@/components/ui/budget-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/redux/redux-hooks";
import { budget } from "@/types";
import { useState } from "react";

const miscellaneousBudget: budget ={
  color: '',
  name: 'miscellaneous',
}

export default function BudgetArea() {

  const { budgets } = useAppSelector(state => state.selectedAccount);

  const [addBudgetDialogOpen, setAddBudgetDialogOpen] = useState(false);

  return (
    <>
      <Card className="w-2/3 h-full p-2">
        <div className="pb-3 pt-2 pl-2 flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl">Budgets:</h1>
          <Button onClick={() => setAddBudgetDialogOpen(true)}>Add Budget Area</Button>
        </div>
        {budgets.length !== 0 && [miscellaneousBudget, ...budgets].map(b => <BudgetCard budgetItem={b} key={b.name} />)}
        {budgets.length === 0 && (
          <CardContent className="w-full flex justify-center items-center">
            <h1>No budgets! Add a budget to get started</h1>
          </CardContent>
        )}
      </Card>
      <div className="absolute right-0 top-0 w-1/3 h-screen flex flex-col pr-4">
        <div className="sticky grow border border-red-500"></div>
        <div className="sticky grow border border-red-500"></div>
      </div>
      <AddBudgetDialog isOpen={addBudgetDialogOpen} onOpenChange={setAddBudgetDialogOpen} />
    </>
  );
}