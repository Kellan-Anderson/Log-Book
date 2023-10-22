import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";


import { transaction } from "@/types";
import { AddTransaction, TransactionCard } from "@/components/ui/transaction-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLastNDays, getNPreviousTransactions, getTotals } from "@/lib/helpers";
import dayjs from "dayjs";
import { Loader2, Plus } from "lucide-react";
import { useAppSelector } from "@/redux/redux-hooks";
import { useState } from "react";


export default function SpendingCard() {
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);

  if(selectedAccount.name === '') {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  const { transactions } = selectedAccount

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
              <Graph data={transactions} />
            </div>
          </Card>
          <div className="col-span-2 flex flex-col justify-between gap-2 lg:h-full pt-2 lg:pt-0">
            <Card className="p-2">
              <CardTitle className="pb-2">Previous Transactions:</CardTitle>
              {pastFiveTransactions.map(t => <TransactionCard transaction={t} key={t.id} />)}
            </Card>
            <div className="grow w-full grid grid-cols-2 gap-1 pb-14 lg:pb-0">
              <TotalsCard amount={getTotals(transactions, 'withdraw')} creditOrDebit="debit" />
              <TotalsCard amount={getTotals(transactions, 'deposit')} creditOrDebit="credit" />
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

  const graphData = getLastNDays(data)

  const CustomTooltip = ({ payload, active }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      // WARN payload is defined as any
      const transactionDate = dayjs(payload?.at(0)?.payload.date).format('MMMM DD')

      return (
        <div className="bg-secondary opacity-90 p-2">
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