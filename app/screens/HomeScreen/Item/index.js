import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Item = ({ _id, title, description, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(_id);
      }}
      activeOpacity={0.6}
      style={styles.container(selected)}
    >
      <View style={{ maxWidth: SCREEN_WIDTH * 0.6 }}>
        <Text style={styles.title(selected)}>{title}</Text>
        <Text style={{ fontSize: 10, color: "black" }}>{description}</Text>
      </View>
      <View style={styles.checkBox}>
        {selected && <Text style={styles.check}>✔</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 27,
    height: 20,
    padding: 0,
    borderRadius: 6,
    borderColor: "#000",
    borderWidth: 0.5,
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  container: (selected) => ({
    width: SCREEN_WIDTH * 0.9,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#50c878",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "darkgreen",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 5,
    alignItems: "center",
  }),
  title: (selected) => ({
    fontSize: 15,
    fontWeight: "bold",
    // color: selected ? "green" : "black",
  }),
  check: {
    color: "green",
    fontSize: 10,
  },
});

export default Item;
