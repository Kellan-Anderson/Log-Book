import { account } from "@/types";
import { useRef } from "react";
import { LineChart, Line } from "recharts"


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

  const divRef = useRef<HTMLDivElement | null>(null);

  const height = divRef.current?.getBoundingClientRect().height;
  const width = divRef.current?.getBoundingClientRect().width;

  return (
    <>
      <h3>Testing</h3>
      <div className="h-full w-full" ref={divRef}>
        <LineChart data={account.transactions} height={height} width={width} >
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </div>
    </>
  );
}

/*




*/
