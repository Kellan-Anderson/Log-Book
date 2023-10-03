import { transaction } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function TransactionCard({ transaction } : { transaction: transaction }) {
  const { amount, date, type, notes } = transaction;

  const transactionDate = dayjs(date);

  return (
    <div className="rounded-xl shadow-sm h-16 w-full overflow-hidden border border-white">
      <div className="w-1/5 h-full bg-primary flex justify-center items-center">
        <p className="text-secondary text-lg">
          {transactionDate.format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
}