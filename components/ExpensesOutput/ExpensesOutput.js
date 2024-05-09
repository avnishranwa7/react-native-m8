import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// local imports
import { GlobalStyles } from "../../constants/style";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(item) {
  return <ExpenseItem {...item.item} />;
}

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const expenseSum = expenses.reduce((sum, curr) => sum + curr.amount, 0);
  return (
    <View style={styles.rootView}>
      <View style={styles.summaryView}>
        <Text style={styles.period}>{expensesPeriod}</Text>
        <Text style={styles.sum}>${expenseSum.toFixed(2)}</Text>
      </View>
      {expenses.length === 0 && (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
      <FlatList
        data={expenses}
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
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
