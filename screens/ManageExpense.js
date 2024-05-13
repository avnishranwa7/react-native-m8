import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// local imports
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, expenseId]);

  async function deleteExpenseHandler() {
    setLoading(true);
    try {
      expensesCtx.deleteExpense(expenseId);
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      setError("Could not delete expense");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setLoading(true);
    try {
      if (expenseId) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      setError("Could not save expense");
    }
  }

  if (loading) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} />;

  return (
    <View style={styles.rootView}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        expenseId={expenseId}
      />
      {expenseId && (
        <View style={styles.deleteView}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteView: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
