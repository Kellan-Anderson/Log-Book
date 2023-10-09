import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { transaction } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

/*

px-3
py-1.5

<p className="font-semibold text-right">${amount}</p>
        


        
        <p>{budgetArea}</p>
*/