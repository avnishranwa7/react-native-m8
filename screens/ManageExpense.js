import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

// local imports
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";

const ManageExpense = ({ navigation, route }) => {
  const expenseId = route.params?.expenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, expenseId]);

  function deleteExpenseHandler() {
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.rootView}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteView: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
