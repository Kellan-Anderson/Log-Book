import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { account } from "@/types";
import { useRef } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { TransactionCard } from "./transaction-components";


const account: account = {
  budgets: [
    {
      name: 'food',
      spent: 100
    },
    {
      name: 'wifi',
      spent: 44.9
    },
    {
      name: 'gas',
      spent: 77.49
    },
    {
      name: 'groceries',
      spent: 50
    }
  ],
  transactions: [
    {
      id: '0',
      date: new Date('2023-10-03T12:34:56'),
      amount: 50,
      budgetArea: 'food',
      type: 'withdraw'
    },
    {
      id: '1',
      date: new Date('2023-10-02T11:34:56'),
      amount: 44.9,
      budgetArea: 'wifi',
      type: 'withdraw'
    },
    {
      id: '2',
      date: new Date('2023-10-01T10:34:56'),
      amount: 77.49,
      budgetArea: 'gas',
      type: 'withdraw',
      notes: '10 gal @ $3.00/gal'
    },
    {
      id: '3',
      date: new Date('2023-09-30T09:34:56'),
      amount: 50,
      budgetArea: 'food',
      type: 'withdraw',
      notes: 'Breakfast @ dunkin'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
  ],
  name: 'Test account 1'
}




export default function SpendingCard({ accountName } : { accountName: string | undefined }) {

  return (
    <div className="h-full flex flex-col">
      <div className="h-96 flex flex-col">
        <Card className="grow p-12">
          <ResponsiveContainer>
              <LineChart data={account.transactions} >
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <XAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
        </Card>
        <div className="w-full flex justify-center pt-8">
          <Button 
            className="w-fit text-lg px-12 rounded-xl"
            variant="secondary"
          >
            Log Transaction
          </Button>
        </div>
      </div>
      <h1 className="text-3xl leading-none tracking-tight font-semibold py-3">Transactions</h1>
      <div className="flex flex-col gap-1.5">
        {account.transactions.map(t => <TransactionCard transaction={t} key={t.id} />)}
      </div>
    </div>
  );
}