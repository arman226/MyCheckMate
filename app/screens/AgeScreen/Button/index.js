import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const Button = ({ text = "Submit", active = true, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={styles.container(active)}
      activeOpacity={active ? 0.7 : 1}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (active) => ({
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.92,
    backgroundColor: active ? "#5bc0de" : "lightblue",
    height: height * 0.05,
    borderRadius: 5,
    marginVertical: 10,
  }),
  text: {
    color: "#FFF",
  },
});

export default Button;
