import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Precaution = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Precaution </Text> */}
      <Text style={styles.instruction}>
        ✳ This is not for self diagnosis but as a guidance from a professional
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  instruction: {
    fontSize: 12,
    paddingVertical: 11,
    fontWeight: "bold",
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
