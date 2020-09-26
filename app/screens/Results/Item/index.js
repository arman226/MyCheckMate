import React from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const Item = ({ item }) => {
  const navigation = useNavigation();
  const onHandlePress = () => {
    navigation.navigate("Details", { item });
  };
  const { name, cause } = item;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={onHandlePress}
    >
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.causeText}>
        {cause.length > 77 ? `${cause.slice(0, 77)}...` : cause}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  causeText: {
    color: "#000",
    fontWeight: "normal",
    fontSize: 10,
  },
  nameText: {
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    width: width * 0.94,
    borderWidth: 0.5,
    marginTop: 3,
    borderRadius: 4,
    justifyContent: "center",
    borderColor: "#CC313D",
    backgroundColor: "#f7c5cc",
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 12,
  },
});

export default Item;
