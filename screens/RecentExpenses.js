import React, { useContext, useEffect, useState } from "react";

// local imports
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { expenses, set } = useContext(ExpensesContext);

  const recentExpense = expenses
    .filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      return expense.date >= date7DaysAgo && expense.date <= today;
    })
    .sort((exp1, exp2) => exp2.date - exp1.date);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const expenses = await getExpenses();
        set(expenses);
      } catch (err) {
        setError("Could not fetch expenses");
      }
      setLoading(false);
    }

    fetchExpenses();
  }, []);

  if (loading) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} />;

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
