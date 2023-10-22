import { useAppSelector } from "@/redux/redux-hooks"
import { useTransactions } from "./transactionHooks";
import { budget, months, ReportType } from "@/types"

export function useBudget(budgetName: string) {
  const { budgets, transactions } = useAppSelector(state => state.selectedAccount);
  const { getThisMonthsTransactions, getThisYearsTransactions, getTransactionsByMonth } = useTransactions()

  const budget: budget | undefined = (budgetName === 'Miscellaneous spending')
    ? { color: '', name: 'Miscellaneous spending' }
    : budgets.find(b => b.name === budgetName);
  if(!budget) {
    throw new Error('Invalid budget name')
  }

  const budgetTransactions = transactions.filter(t => t.budgetArea === budgetName);
  const now = new Date();

  const getThisMonthsSpending = () => {
    const thisMonthsTransactions = getThisMonthsTransactions(budgetTransactions);
    const thisMonthsSpending = thisMonthsTransactions
      .map(t => t.amount)
      .reduce((total, val) => total + val, 0);

    return thisMonthsSpending;
  }

  const generateMonthReport = (): ReportType => {
    const { alloted } = budget;
    const monthsTransactions = getThisMonthsTransactions(budgetTransactions);
    const spentThisMonth = monthsTransactions
      .map(t => t.amount)
      .reduce((total, val) => total + val, 0);
     
    return {
      spent: spentThisMonth,
      budgeted: alloted,
      difference: alloted && alloted - spentThisMonth
    }
  }

  const generateYearReport = (): ReportType => {
    const { alloted } = budget;
    const yearToDateTransactions = getThisYearsTransactions(budgetTransactions);
    const spentThisYear = yearToDateTransactions
      .map(t => t.amount)
      .reduce((total, val) => total + val, 0);

    const yearToDateAlloted = alloted ? alloted * (now.getMonth() + 1) : undefined;

    const difference = yearToDateAlloted && yearToDateAlloted - spentThisYear;

    return {
      spent: spentThisYear,
      budgeted: yearToDateAlloted,
      difference
    }
  }

  const generateAnnualReport = () => {
    const { alloted } = budget;
    const thisYearsTransactions = getThisYearsTransactions(budgetTransactions);
    const totalSpent = thisYearsTransactions
      .map(t => t.amount)
      .reduce((total, val) => total + val, 0);

    const annualBudget = alloted && alloted * 12;
    const remaining = annualBudget && annualBudget - totalSpent;
    
    return {
      annualBudget,
      remaining
    };
  }

  const generateMonthlyAverage = () => {
    const months: months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsUntilNow: months[] = months.filter(month => new Date(`${month} 1 ${now.getFullYear()}`) < now);
    const transactionsByMonth = monthsUntilNow.map(month => getTransactionsByMonth(budgetTransactions, month));

    const monthlyTotals = transactionsByMonth.map(transactions => {
      return transactions.map(t => t.amount).reduce((total, val) => total + val, 0);
    });

    const average = monthlyTotals.reduce((total, val) => total + val, 0) / monthsUntilNow.length;
    return average
  }

  return {
    report: {
      monthReport: generateMonthReport(),
      yearToDate: generateYearReport(),
      annualReport: generateAnnualReport(),
      other: {
        averageSpentPerMonth: generateMonthlyAverage()
      }
    },
    getThisMonthsSpending
  }
}