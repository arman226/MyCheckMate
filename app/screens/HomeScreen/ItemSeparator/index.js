import React from "react";
import { View, StyleSheet } from "react-native";

const ItemSeparator = () => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: { borderBottomColor: "skyblue", borderBottomWidth: 0.7 },
});

export default ItemSeparator;
