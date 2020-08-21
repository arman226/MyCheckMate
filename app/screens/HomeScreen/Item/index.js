import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Item = ({ _id, title, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(_id);
      }}
      activeOpacity={0.6}
      style={styles.container(selected)}
    >
      <Text style={styles.title(selected)}>{title}</Text>
      <View>{selected && <Text style={styles.check}>✔</Text>}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (selected) => ({
    width: SCREEN_WIDTH * 0.9,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    // backgroundColor: selected ? "lightgreen" : null,
    // borderWidth: 0.5,
    // borderColor: selected ? "darkgreen" : "lightgreen",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 5,
  }),
  title: (selected) => ({
    fontSize: 15,
    fontWeight: selected ? "bold" : "normal",
    // color: selected ? "green" : "black",
  }),
  check: {
    paddingHorizontal: 10,
    color: "green",
    fontSize: 10,
  },
});

export default Item;
