import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// local imports
import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/style";
import { ExpensesContext } from "../../store/expenses-context";

const ExpenseForm = ({ onCancel, onSubmit, expenseId }) => {
  const { expenses } = useContext(ExpensesContext);
  const expense = expenses.find((expense) => expense.id === expenseId);

  const [input, setInput] = useState({
    amount: {
      value: expense ? expense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expense ? getFormattedDate(expense.date) : "",
      isValid: true,
    },
    description: {
      value: expense ? expense.description : "",
      isValid: true,
    },
  });

  function formChangeHandler(inputIdentifier, value) {
    setInput((prev) => ({
      ...prev,
      [inputIdentifier]: { value, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      setInput((prev) => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        description: { value: prev.description.value, isValid: descIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.rootView}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (val) => formChangeHandler("amount", val),
            value: input.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (val) => formChangeHandler("date", val),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (val) => formChangeHandler("description", val),
          value: input.description.value,
        }}
      />
      {formInvalid && (
        <Text style={styles.errorText}>Invalid Input Values</Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  rootView: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
