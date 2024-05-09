import React, { useContext } from "react";

// local imports
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const sortedExpenses = expenses.sort((exp1, exp2) => exp2.date - exp1.date);

  return (
    <ExpensesOutput
      expenses={sortedExpenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
