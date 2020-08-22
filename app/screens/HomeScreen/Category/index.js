import React from "react";
import { TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Category = ({ onCategorySelect, category }) => {
  const { name } = category.item;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCategorySelect(category)}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.5,
    flex: 1,
    marginLeft: 5,
    marginRight: 3,
    marginBottom: 9,
    marginTop: 1,
    borderRadius: 4,
    height: SCREEN_HEIGHT * 0.15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 1,
    backgroundColor: "#FFFAFA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});
export default Category;
