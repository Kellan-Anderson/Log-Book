import { BudgetReport, budget } from "@/types";
import { DollarSign, MoreVertical } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { useBudget } from "@/hooks/budgetHooks";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { z } from "zod";
import { useRef, useState } from "react";
import { ColorPicker } from "./colorPicker";
import { useAppDispatch } from "@/redux/redux-hooks";
import { editOrAddBudget } from "@/redux/reducers/selectedAccountSlice";

export function BudgetCard({ budgetItem } : { budgetItem: budget }) {
  const { getThisMonthsSpending, report } = useBudget(budgetItem.name);
  const { name, alloted, icon, color, description } = budgetItem;

  const [editBudgetDialogOpen, setEditBudgetDialogOpen] = useState(false);

  const spent = getThisMonthsSpending();

  const formattedAlloted = alloted && Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(alloted)
  const formattedSpent = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent);

  return (
    <>
      <div className="flex flex-row border h-fit border-slate-600 rounded-lg mb-1.5 first:mt-1 last:mb-0 overflow-hidden">
        <div className="w-14 flex justify-center items-center rounded-r-lg mr-1" style={{ background: color }}>
          {icon ? icon : <DollarSign /> }
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-row justify-between pr-3">
            <p className={`font-semibold text-right`}>{name}</p>
            <p className="font-semibold">
              {formattedAlloted ? `${formattedSpent} of ${formattedAlloted}` : formattedSpent}
            </p>
          </div>
          <div className="flex flex-row justify-between pr-3 pb-0.5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="notes" className="border-none w-full">
                <div className="flex flex-row justify-end w-full">
                  {(alloted !== 0 && alloted !== undefined) && (
                    <div className="flex justify-center items-center w-full pr-4">
                      <ProgressBar percentage={spent/alloted} />
                    </div>
                  )}
                  <AccordionTrigger
                    className="p-0 justify-end hover:no-underline whitespace-nowrap"
                  >
                    Details
                  </AccordionTrigger>
                </div>
                <AccordionContent className="p-0">
                  <div className="flex flex-row gap-1 text-lg">
                    <h1 className="font-bold">Budget Name:</h1>
                    <p>{name}</p>
                  </div>
                  {description && <><h1>Description:</h1><p>{description}</p></>}
                  <BudgetDetails report={report} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex items-center justify-center pr-1">
          <MoreVertical 
            className="hover:cursor-pointer"
            onClick={() => setEditBudgetDialogOpen(true)}
          />
        </div>
      </div>
      <AddBudgetDialog isOpen={editBudgetDialogOpen} onOpenChange={setEditBudgetDialogOpen} budget={budgetItem} />
    </>
  );
}

function BudgetDetails({ report } : { report: BudgetReport }) {
  const { monthReport, yearToDate, annualReport } = report;

  const { spent: monthSpent, budgeted: monthBudgeted, difference: monthDifference} = monthReport;
  const { spent: yearSpent, budgeted: yearBudgeted, difference: yearDifference } = yearToDate;
  const { annualBudget, remaining } = annualReport;

  return (
    <>
      <ReportTitle>Month Report:</ReportTitle>
      <div className="grid grid-flow-col pb-1.5">
        <ReportDetail name="Spent" value={monthSpent} />
        {(monthBudgeted !== 0 && monthBudgeted !== undefined) && (
          <ReportDetail name="Budgeted" value={monthBudgeted} />
        )}
        {(monthDifference !== 0 && monthDifference !== undefined) && (
          <ReportDetail name="Difference" value={monthDifference} />
        )}
      </div>

      <ReportTitle>Year to Date:</ReportTitle>
      <div className="grid grid-flow-col pb-1.5">
        <ReportDetail name="Spent" value={yearSpent} />
        {(yearBudgeted !== 0 && yearBudgeted !== undefined) && (
          <ReportDetail name="Budgeted" value={yearBudgeted} />
        )}
        {(yearDifference !== 0 && yearDifference !== undefined) && (
          <ReportDetail name="Difference" value={yearDifference} />
        )}
      </div>

      <ReportTitle>Annual:</ReportTitle>
      <div className="grid grid-flow-col pb-1.5">
        {(!annualBudget && !remaining) && <h2 className="font-semibold">No data</h2>}
        {(annualBudget !== 0 && annualBudget !== undefined) && (
          <ReportDetail name="Annual Budget" value={annualBudget} />
        )}
        {(remaining !== 0 && remaining !== undefined) && (
          <ReportDetail name="Remaining" value={remaining} />
        )}
      </div>
    </>
  );
}

function ReportTitle({ children } : { children: string }) {
  return <h1 className="font-bold text-lg">{children}</h1>
}

function ReportDetail({ name, value } : { name: string, value: number }) {

  const formattedValue = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const textColor = value >= 0 ? 'text-green-500' : 'text-red-500';

  return (
   <div className="flex flex-row gap-1 pr-4">
     <h2 className="font-semibold">{name}:</h2>
     <p className={`${textColor}`}>{formattedValue}</p>
   </div>
  );
}

function ProgressBar({ percentage } : { percentage : number}) {
  return (
    <div className="h-[4px] w-full bg-secondary rounded-lg overflow-hidden">
      <div className="h-full bg-red-500 rounded-lg" style={{ width: `${percentage * 100}%`}}></div>
    </div>
  );
}


export function AddBudgetDialog({ isOpen, onOpenChange, budget } : {
  isOpen: boolean,
  onOpenChange: (arg0: boolean) => void,
  budget?: budget
}) {

  const dispatch = useAppDispatch();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const budgetColor = useRef<string>(budget?.color ?? '');
  console.log('Recieved color: ', budgetColor.current);

  const { register, handleSubmit } = useForm<budget>({ defaultValues: budget });
  const onFormSubmit: SubmitHandler<budget> = (values) => {
    setErrorMessages([])
    dispatch(editOrAddBudget({
      ...values,
      alloted: (values.alloted && !isNaN(values.alloted)) ? values.alloted : undefined,
      color: budgetColor.current
    }));
    onOpenChange(false)
  }

  const onFormSubmitError: SubmitErrorHandler<budget> = (values) => {
    const messages: string[] = [];
    Object.entries(values).forEach(([_, val]) => {
      if(val.message) messages.push(val.message)
    });
    setErrorMessages(messages);
  }

  const iconValidation = (val: string | undefined) => {
    if(val === undefined || val === '') return true;
    const { success } = z.string().length(2).emoji().safeParse(val);
    return success || 'Please enter a single emoji'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Add a budget:</DialogTitle>
        <form onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)} className="flex flex-col gap-2">
          <Label>Budget Name:</Label>
          <Input
            placeholder="Name"
            {...register('name', {
              required: 'Please enter a name'
            })}
          />

          <Label>Budget Amount (Optional)</Label>
          <Input type="number" {...register('alloted', { valueAsNumber: true })} />

          <Label>Icon Emoji</Label>
          <Input
            {...register('icon', {
              required: false,
              validate: (val) => iconValidation(val)
            })}
          />

          <Label>Color</Label>
          <ColorPicker onColorChange={(color) => budgetColor.current = color} />

          <Label>Description (Optional)</Label>
          <Textarea {...register('description')} />

          <Button type="submit" className="w-full">Add</Button>
          {errorMessages.map(err => <p className="text-red-500 text-sm font-semibold" key={err}>{err}</p>)}
        </form>
      </DialogContent>
    </Dialog>
  );
}