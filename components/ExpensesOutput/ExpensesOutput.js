import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// local imports
import { GlobalStyles } from "../../constants/style";
import ExpenseItem from "./ExpenseItem";

const DUMMY_EXPENSES = [
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
];

function renderExpenseItem(item) {
  return <ExpenseItem {...item.item} />;
}

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  const expenseSum = DUMMY_EXPENSES.reduce((sum, curr) => sum + curr.amount, 0);
  return (
    <View style={styles.rootView}>
      <View style={styles.summaryView}>
        <Text style={styles.period}>{expensesPeriod}</Text>
        <Text style={styles.sum}>${expenseSum.toFixed(2)}</Text>
      </View>
      <FlatList
        data={DUMMY_EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
      />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  summaryView: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 15,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
