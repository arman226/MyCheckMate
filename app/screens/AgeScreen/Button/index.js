import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const Button = ({
  text = "Submit",
  active = true,
  onPress = () => {},
  buttonWidth = width * 0.92,
}) => {
  const onHandlePress = () => {
    active ? onPress() : null;
  };
  return (
    <TouchableOpacity
      style={styles.container(active, buttonWidth)}
      activeOpacity={active ? 0.7 : 1}
      onPress={onHandlePress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (active, buttonWidth) => ({
    alignItems: "center",
    justifyContent: "center",
    width: buttonWidth,
    backgroundColor: active ? "#078282ff" : "#8abaae",
    height: height * 0.05,
    borderRadius: 5,
    marginVertical: 10,
  }),
  text: {
    color: "#FFF",
  },
});

export default Button;
