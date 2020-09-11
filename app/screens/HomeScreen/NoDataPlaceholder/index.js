import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const NoDataPlaceholder = ({ text, children }) => {
  return (
    <View style={styles.container}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    color: "#adadad",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export default NoDataPlaceholder;
