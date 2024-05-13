import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  set: (expenses) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  function addExpense({ description, amount, date }) {
    const id = new Date().toString() + Math.random.toString();
    setExpenses((prev) => [{ id, description, amount, date }, ...prev]);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  function updateExpense(id, { description, amount, date }) {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id === id) {
          return { ...expense, description, amount, date };
        }

        return expense;
      })
    );
  }

  function set(expenses) {
    setExpenses(expenses);
  }

  const value = { expenses, addExpense, deleteExpense, updateExpense, set };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
