import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";


import { transaction, account } from "@/types";
import { AddTransaction, TransactionCard } from "@/components/ui/transaction-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLastNDays, getNPreviousTransactions, getTotalDeposit, getTotalWithdraw } from "@/lib/helpers";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/redux/redux-hooks";
import { useState } from "react";

// TEST DATA
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
      date: new Date('2023-09-29T12:34:56'),
      amount: 50,
      budgetArea: 'food',
      type: 'withdraw'
    },
    {
      id: '1',
      date: new Date('2023-09-30T11:34:56'),
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
      date: new Date('2023-10-02T09:34:56'),
      amount: 50,
      budgetArea: 'food',
      type: 'withdraw',
      notes: 'Breakfast @ dunkin'
    },
    {
      id: '4',
      date: new Date('2023-10-03T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '5',
      date: new Date('2023-10-04T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '6',
      date: new Date('2023-10-05T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '7',
      date: new Date('2023-10-06T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw'
    },
    {
      id: '8',
      date: new Date('2023-10-07T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw',
      notes: 'last'
    },
    {
      id: '9',
      date: new Date('2023-10-08T08:34:56'),
      amount: 50,
      budgetArea: 'groceries',
      type: 'withdraw',
      notes: 'last'
    },
  ],
  name: 'Test account 1'
}

export default function SpendingCard({ accountName } : { accountName?: string }) {
  const accountsData = useAppSelector(state => state.spending);
  const account = accountsData.filter(acc => acc.name === accountName).at(0);

  const [addTransactionOpen, setAddTransactionOpen] = useState(false);

  const transactions = account === undefined ? [] : account.transactions;

  const pastFiveTransactions = getNPreviousTransactions(transactions);

  const onAddTransactionClick = () => {
    setAddTransactionOpen(true);
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold py-2">Spending</h1>
        <div className="w-full lg:grid lg:grid-cols-5 gap-2 grow">
          <Card className="col-span-3 px-3 flex flex-col h-1/3 lg:h-full">
            <CardTitle className="pt-3">Previous Five days</CardTitle>
            <div className="grow">
              <Graph data={pastFiveTransactions} />
            </div>
          </Card>
          <div className="col-span-2 flex flex-col justify-between gap-2 lg:h-full pt-2 lg:pt-0">
            <Card className="p-2">
              <CardTitle className="pb-2">Previous Transactions:</CardTitle>
              {pastFiveTransactions.map(t => <TransactionCard transaction={t} key={t.id} />)}
            </Card>
            <div className="grow w-full grid grid-cols-2 gap-1 pb-14 lg:pb-0">
              <TotalsCard amount={getTotalWithdraw(transactions)} creditOrDebit="debit" />
              <TotalsCard amount={getTotalDeposit(transactions)} creditOrDebit="credit" />
            </div>
            <Button className="hidden lg:block" onClick={onAddTransactionClick}>
              Add a transaction
            </Button>
            <FloatingActionButton className="lg:hidden" onClick={onAddTransactionClick}/>
          </div>
        </div>
      </div>
      <AddTransaction isOpen={addTransactionOpen} onOpenChange={setAddTransactionOpen} />
    </>
  );
}

function Graph({ data } : { data: transaction[] }) {

  const graphData = getLastNDays(data).map(d => ({...d, name: dayjs(d.date).format('dd/mm')}))

  const CustomTooltip = ({ payload, active }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      // WARN payload is defined as any
      const transactionDate = dayjs(payload?.at(0)?.payload.date).format('MMMM DD')

      return (
        <div className="bg-secondary p-2">
          <p>Date: {transactionDate}</p>
          <p>{`Amount: $${payload?.at(0)?.value || 'Error'}`}</p>
        </div>
      );
    }
  
    return null;
  }

  return (
    <ResponsiveContainer>
      <LineChart data={graphData}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <XAxis />
        <Tooltip content={<CustomTooltip />}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

function TotalsCard({ amount, creditOrDebit, className } : {
  amount: number,
  creditOrDebit: 'credit' | 'debit',
  className?: string
}) {

  const color = creditOrDebit === 'debit' ? 'red' : 'green';

  let sign: string | undefined = undefined;
  if(amount !== 0) {
    sign = creditOrDebit === 'debit' ? '-' : '+'
  }

  return (
    <Card className={`${className ? className : ''} h-full`}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Total {creditOrDebit}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <h1 className={`text-4xl lg:text-5xl text-${color}-500`}>
          {sign && sign}${amount}
        </h1>
      </CardContent>
    </Card>
  );
}

function FloatingActionButton(props: {
  onClick?: () => void,
  className?: string,
}) {
  return (
    <Button
      className={`fixed right-0 bottom-0 rounded-full p-2 mr-6 mb-6 ${props.className}`}
      onClick={props.onClick}
    >
      <Plus />
    </Button>
  );
}