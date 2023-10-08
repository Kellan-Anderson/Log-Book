import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { account, transaction } from "@/types";
import { useEffect, useRef, useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { TransactionCard } from "./transaction-components";
import { ScrollArea } from "@/components/ui/scroll-area";


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
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '4',
      date: new Date('2023-09-29T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
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

  const [scrollHeight, setScrollHeight] = useState<number>();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(scrollAreaRef.current) {
      setScrollHeight(scrollAreaRef.current.getBoundingClientRect().height);
      console.log(scrollAreaRef.current.getBoundingClientRect().height)
    }
  }, []);


  const { transactions } = account;

  return (
    <div className="h-full w-full border border-white grid grid-cols-3">
      <span className="border border-blue-400 col-span-2 p-6">
        <Graph data={transactions} />
      </span>
      
    </div>
  );
}

function TransactionsList({ data } : { data: transaction[] }) {
  return (
    <>
      {account.transactions.map(t => <TransactionCard transaction={t} key={t.id} />)}
    </>
  );
}

function Graph({ data } : { data: transaction[]}) {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <XAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}