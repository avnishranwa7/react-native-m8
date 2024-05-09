import React, { useContext } from "react";

// local imports
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpense = expenses
    .filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      return expense.date >= date7DaysAgo && expense.date <= today;
    })
    .sort((exp1, exp2) => exp2.date - exp1.date);

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
