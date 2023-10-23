import { AddBudgetDialog, BudgetCard } from "@/components/ui/budget-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/redux/redux-hooks";
import { budget } from "@/types";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { z } from "zod";

const miscellaneousBudget: budget ={
  color: '',
  name: 'Miscellaneous spending',
  id: '000000'
}

export default function BudgetArea() {

  const { budgets, transactions } = useAppSelector(state => state.selectedAccount);

  const [addBudgetDialogOpen, setAddBudgetDialogOpen] = useState(false);

  const budgetsData = [miscellaneousBudget, ...budgets]
    .map(({ name, alloted, color }) => ({ name, color, value: alloted }))
    .filter(b => b.value !== undefined);

  const generateSpendingData = () => {
    const totals: {name: string, value: number, color: string}[] = [];
    transactions.forEach(t => {
      const totalsAreaIndex = totals.findIndex(total => total.name === t.budgetArea);

      const color = budgets.find(b => b.name === t.budgetArea)?.color ?? '';

      if(totalsAreaIndex === -1) {
        totals.push({ name: t.budgetArea, value: t.amount, color })
      } else {
        const currentTotal = totals[totalsAreaIndex];
        totals[totalsAreaIndex] = {...currentTotal, value: currentTotal.value + t.amount}
      }
    })

    return totals;
  }

  const spendingData = generateSpendingData();

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse gap-3">
        <Card className="static lg:sticky lg:top-0 h-80 lg:h-screen mb-2 grid lg:grid-rows-2 grid-cols-2 w-full lg:w-1/3">
          <div className="lg:col-span-full">
            <Graph data={budgetsData} label="Budgeted" />
          </div>
          <div className="lg:col-span-full">
            <Graph data={spendingData} label="Spent" />
          </div>
        </Card>
        <Card className="w-full lg:w-2/3 h-full p-2 mb-2">
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
      </div>
      <AddBudgetDialog isOpen={addBudgetDialogOpen} onOpenChange={setAddBudgetDialogOpen} />
    </>
  );
}

function Graph({ data, label } : {
  data: { name: string, value: number | undefined, color: string }[],
  label: string
}) {

  const CustomToolTip = ({ payload }: TooltipProps<ValueType, NameType>) => {
    const value = payload?.at(0)?.value;
    const checker = z.number().safeParse(value);

    const amount = checker.success ? checker.data : 0;
    const formattedAmount = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
      <div className="bg-secondary opacity-90 p-2">
        <p>Name: {payload?.at(0)?.name ?? 'No name'}</p>
        <p>Amount: {formattedAmount}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center font-semibold">{label}:</h1>
      <ResponsiveContainer className="grow">
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" outerRadius='80%'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomToolTip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}