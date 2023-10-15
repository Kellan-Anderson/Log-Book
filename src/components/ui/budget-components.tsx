import { BudgetReport, ReportType, budget } from "@/types";
import { DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { useBudget } from "@/hooks/budgetHooks";

export function BudgetCard({ budgetItem } : { budgetItem: budget }) {
  const { getThisMonthsSpending, report } = useBudget(budgetItem.name);
  const { name, alloted, icon, color, description } = budgetItem;

  const spent = getThisMonthsSpending();

  const formattedAlloted = alloted && Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(alloted)
  const formattedSpent = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent);

  return (
    <div className="flex flex-row border h-fit border-slate-600 rounded-lg mb-1.5 first:mt-1 last:mb-0 overflow-hidden">
      <div className={`w-14 flex justify-center items-center ${color} rounded-r-lg mr-1`}>
        {icon ? icon : <DollarSign /> }
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between pr-3">
          <p className={`font-semibold text-right`}>{name}</p>
          <p>
            {formattedAlloted ? `${formattedSpent} of ${formattedAlloted}` : formattedSpent}
          </p>
        </div>
        <div className="flex flex-row justify-between pr-3 pb-0.5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notes" className="border-none w-full">
              <div className="flex flex-row justify-end w-full">
                {alloted && (
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
    </div>
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
        {monthBudgeted && <ReportDetail name="Budgeted" value={monthBudgeted} />}
        {monthDifference && <ReportDetail name="Difference" value={monthDifference} />}
      </div>

      <ReportTitle>Year to Date:</ReportTitle>
      <div className="grid grid-flow-col pb-1.5">
        <ReportDetail name="Spent" value={yearSpent} />
        {yearBudgeted && <ReportDetail name="Budgeted" value={yearBudgeted} />}
        {yearDifference && <ReportDetail name="Difference" value={yearDifference} />}
      </div>

      <ReportTitle>Annual:</ReportTitle>
      <div className="grid grid-flow-col pb-1.5">
        {(!annualBudget && !remaining) && <h2 className="font-semibold">No data</h2>}
        {annualBudget && <ReportDetail name="Annual Budget" value={annualBudget} />}
        {remaining && <ReportDetail name="Remaining" value={remaining} />}
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
    <div className="h-[4px] w-full bg-white rounded-lg overflow-hidden">
      <div className="h-full bg-red-500 rounded-lg" style={{ width: `${percentage * 100}%`}}></div>
    </div>
  );
}
