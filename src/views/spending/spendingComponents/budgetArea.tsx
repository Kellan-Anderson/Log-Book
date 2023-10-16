import { AddBudgetDialog, BudgetCard } from "@/components/ui/budget-components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/redux/redux-hooks";
import { testData } from "@/testData";
import { useState } from "react";

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
        {testData.budgets.map(b => <BudgetCard budgetItem={b} key={b.name} />)}
      </Card>
      <div className="absolute right-0 top-0 w-1/3 h-screen flex flex-col pr-4">
        <div className="sticky grow border border-red-500"></div>
        <div className="sticky grow border border-red-500"></div>
      </div>
      <AddBudgetDialog isOpen={addBudgetDialogOpen} onOpenChange={setAddBudgetDialogOpen} />
    </>
  );
}