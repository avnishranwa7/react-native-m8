import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      description: "A pair of shoes",
      amount: 59.99,
      date: new Date("2024-04-12"),
    },
    {
      id: "e2",
      description: "A pair of trousers",
      amount: 89.29,
      date: new Date("2024-04-30"),
    },
    {
      id: "e3",
      description: "Some bananas",
      amount: 5.99,
      date: new Date("2024-05-01"),
    },
    {
      id: "e4",
      description: "A book",
      amount: 14.99,
      date: new Date("2024-05-04"),
    },
    {
      id: "e5",
      description: "Another book",
      amount: 18.59,
      date: new Date("2024-04-05"),
    },
    {
      id: "e6",
      description: "Another book",
      amount: 18.59,
      date: new Date("2024-04-05"),
    },
    {
      id: "e7",
      description: "Another book",
      amount: 18.59,
      date: new Date("2024-04-05"),
    },
  ]);

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

  const value = { expenses, addExpense, deleteExpense, updateExpense };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
