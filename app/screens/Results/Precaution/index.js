import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Precaution = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Text style={styles.iconText}>!</Text>
      </View>
      <View>
        <Text style={styles.instruction}>
          This is not for self diagnosis but as a guidance from a professional
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  instruction: {
    fontSize: 10,
    paddingVertical: 11,
  },
  container: {
    padding: 6,
    marginRight: 2,
    marginTop: 10,
    backgroundColor: "#FFFF9F",
    borderColor: "yellow",
    borderWidth: 2,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 13,
  },
  iconView: {
    borderColor: "orange",
    borderWidth: 2,
    height: 20,
    width: 20,
    padding: 3,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 5,
    backgroundColor: "orange",
  },
  iconText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Precaution;
