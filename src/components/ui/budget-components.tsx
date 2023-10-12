import { budget } from "@/types";
import { DollarSign, MoreVertical } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

export function BudgetCard({ budgetItem } : { budgetItem: budget }) {
  const { name, spent, alloted, description, icon } = budgetItem;

  const formattedAlloted = alloted && Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(alloted)
  const formattedSpent = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)

  return (
    <div className="flex flex-row border h-fit border-slate-600 rounded-lg mb-1.5 first:mt-1 last:mb-0 overflow-hidden">
      <div className="w-14 flex justify-center items-center bg-blue-600 rounded-r-lg mr-1">
        {icon ? (
          <div>
            {icon}
          </ div>
        ) : (
          <DollarSign />
        )}
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between pr-3">
          <p className={`font-semibold text-right`}>
            {name}
          </p>
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
                <>
                  budget name
                  description
                  amount spent
                  average spent
                  YTD spent
                  YTD remaining
                  Graph?
                </>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
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

export function budgetDetailsDialog({ budget } : { budget: budget }) {
  return (
    <></>
  );
}