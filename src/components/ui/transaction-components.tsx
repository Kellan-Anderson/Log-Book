import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PartialTransaction, transaction } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useRef, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { Button } from "./button";
import { addTransaction } from "@/redux/reducers/selectedAccountSlice";

dayjs.extend(relativeTime);

export function TransactionCard({ transaction } : { transaction: transaction }) {
  const { amount, date, type, notes, budgetArea } = transaction;

  return (
    <>
      <div className="flex flex-col h-fit w-full border border-slate-600 py-0.5 mb-1.5 first:mt-1 last:mb-0 rounded-lg">
        <div className="flex flex-row justify-between px-3">
          <p className="font-semibold">{dayjs(date).format("MMMM DD, YYYY")}</p>
          <p className={`font-semibold text-right ${type === "withdraw" ? 'text-red-500' : 'text-green-500'}`}>
            {type === 'withdraw' ? '-' : '+'}
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
          </p>
        </div>
        <div className="flex flex-row justify-between px-3 pb-0.5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notes" className="border-none w-full">
              <div className="flex flex-row justify-between w-full">
                <p>{budgetArea}</p>
                <AccordionTrigger
                  disabled={notes === undefined}
                  className="p-0 justify-end disabled:text-gray-400 hover:no-underline"
                >
                  Notes
                </AccordionTrigger>
              </div>
              <AccordionContent className="p-0">
                {notes}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export function AddTransaction({ isOpen, onOpenChange } : { isOpen: boolean, onOpenChange: (arg0: boolean) => void }) {
  const transactionType = useRef<'withdraw' | 'deposit'>('withdraw');
  const budgetArea = useRef<string>('miscellaneous')

  const account = useAppSelector(state => state.selectedAccount);
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  type TransactionFormType = {
    amount: number,
    notes: string
  }
  const { register, handleSubmit} = useForm<TransactionFormType>();

  const onFormSubmit: SubmitHandler<TransactionFormType> = (values) => {
    const transaction: PartialTransaction = {
      amount: values.amount,
      budgetArea: budgetArea.current,
      type: transactionType.current,
      date: new Date().toString(),
      notes: values.notes
    }
    dispatch(addTransaction(transaction));
    onOpenChange(false);
  }
  const onFormSubmitError: SubmitErrorHandler<TransactionFormType> = (values) => {
    setErrorMessage(values.amount?.message);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
          <Tabs
            defaultValue="withdraw"
            onValueChange={(val) => transactionType.current = val === 'withdraw' ? val : 'deposit'}
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-row justify-center items-center gap-2">
            <Label htmlFor="amount" className="text-lg">Amount:</Label>
            <Input
              type="number"
              id="amount"
              {...register('amount', {
                required: 'Please enter an amount'
              })}
            />
          </div>
          <Label htmlFor="budgetSelector">Select a budget</Label>
          <Select>
            <SelectTrigger defaultValue="miscellaneous" id="budgetSelector">
              <SelectValue placeholder="Misc." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="miscellaneous">Misc.</SelectItem>
              {account.budgets.map(budget => (
                <SelectItem value={budget.name} key={budget.name}>{budget.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor="notes">Notes:</Label>
          <Textarea
            id="notes"
            {...register('notes')}
          />
          {errorMessage && <p className="text-sm font-semibold text-red-500">{errorMessage}</p>}
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}