import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// local imports
import { GlobalStyles } from "../../constants/style";

const LoadingOverlay = () => {
  return (
    <View style={styles.rootView}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
