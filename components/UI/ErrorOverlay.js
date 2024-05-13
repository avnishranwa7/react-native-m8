import React from "react";
import { View, StyleSheet, Text } from "react-native";

// local imports
import { GlobalStyles } from "../../constants/style";
import Button from "./Button";

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.rootView}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
