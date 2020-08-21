import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const NoDataPlaceholder = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
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
});
export default NoDataPlaceholder;
