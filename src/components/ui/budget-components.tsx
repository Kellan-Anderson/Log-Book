import { BudgetReport, budget } from "@/types";
import { Ban, DollarSign, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { useBudget } from "@/hooks/budgetHooks";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./dialog";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { z } from "zod";
import { useRef, useState } from "react";
import { ColorPicker } from "./colorPicker";
import { useAppDispatch } from "@/redux/redux-hooks";
import { addBudget, deleteBudget, editBudget } from "@/redux/reducers/selectedAccountSlice";
import { generateId } from "@/lib/helpers";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useDispatch } from "react-redux";

export function BudgetCard({ budgetItem } : { budgetItem: budget }) {
  const { getThisMonthsSpending, report } = useBudget(budgetItem.name);
  const { name, alloted, icon, color, description } = budgetItem;

  const [editBudgetDialogOpen, setEditBudgetDialogOpen] = useState(false);
  const [deleteBudgetDialogOpen, setDeleteBudgetDialogOpen] = useState(false);

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
          <Popover>
            <PopoverTrigger>
              <MoreVertical 
                className="hover:cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-fit text-sm p-2">
              <span
                className="flex flex-row justify-between items-center gap-2 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-sm"
                onClick={() => setEditBudgetDialogOpen(true)}
              >
                <Pencil className="h-4 w-4"/>
                Edit budget
              </span>
              <div className="h-px my-[2px] bg-gray-400"></div>
              <span 
                className="flex flex-row justify-between items-center gap-2 hover:bg-gray-400 hover:cursor-pointer p-1 rounded-sm text-red-500"
                onClick={() => setDeleteBudgetDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 text-red-500"/>
                Delete budget
              </span>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AddBudgetDialog 
        editMode 
        isOpen={editBudgetDialogOpen} 
        onOpenChange={setEditBudgetDialogOpen} 
        budget={budgetItem}  
      />
      <DeleteBudgetDialog isOpen={deleteBudgetDialogOpen} onOpenChange={setDeleteBudgetDialogOpen} budget={budgetItem} />
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


export function AddBudgetDialog({ isOpen, onOpenChange, budget, editMode } : {
  isOpen: boolean,
  onOpenChange: (arg0: boolean) => void,
  budget?: budget,
  editMode?: boolean
}) {

  const dispatch = useAppDispatch();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const budgetColor = useRef<string>(budget?.color ?? '');

  const { register, handleSubmit } = useForm<budget>({ defaultValues: budget });
  const onFormSubmit: SubmitHandler<budget> = (values) => {
    setErrorMessages([])
    const addedOrEditedBudget = {
      ...values,
      alloted: (values.alloted && !isNaN(values.alloted)) ? values.alloted : undefined,
      color: budgetColor.current
    }
    if(editMode) {
      console.log('editing')
      dispatch(editBudget(addedOrEditedBudget));
    } else {
      console.log('adding')
      dispatch(addBudget({
        ...addedOrEditedBudget,
        id: generateId({ prefix: 'b-' })
      }))
    }
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
    const { success } = z.string().emoji().min(0).max(2).safeParse(val);
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

          <Button type="submit" className="w-full">{editMode ? "Submit" : "Add"}</Button>
          {errorMessages.map(err => <p className="text-red-500 text-sm font-semibold" key={err}>{err}</p>)}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteBudgetDialog({ budget, isOpen, onOpenChange } : {
  budget: budget,
  isOpen: boolean,
  onOpenChange: (arg0: boolean) => void
}) {

  const dispatch = useDispatch();

  const onCancel = () => {
    onOpenChange(false);
  }

  const onDelete = () => {
    dispatch(deleteBudget(budget));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent>
        <DialogTitle>{`Are you sure you want to delete ${budget.name}?`}</DialogTitle>
        <DialogDescription>Once you delete the budget there is no way to recover it</DialogDescription>
        <div className="flex flex-row w-full justify-center gap-5">
          <Button
            className="grow gap-2"
            onClick={onCancel}
          >
            <Ban className="h-4 w-4" />
            Cancel
          </Button>
          <Button 
            variant="destructive"
            className="grow gap-2"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}