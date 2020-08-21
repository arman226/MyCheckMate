import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Precaution = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identify Your Symptoms</Text>
      <Text style={styles.instruction}>
        Kindly specify your symptoms from the categories below, so we can help
        you understand your condition.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  instruction: {
    fontSize: 12,
    paddingVertical: 11,
  },
  container: {
    padding: 5,
    paddingTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Precaution;
