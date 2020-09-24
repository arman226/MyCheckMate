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
      <Text style={{ color: "#000", fontWeight: "bold" }}>{name}</Text>
      <Text style={{ color: "#000", fontWeight: "normal", fontSize: 10 }}>
        {cause.length > 77 ? `${cause.slice(0, 77)}...` : cause}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: width * 0.94,
    borderWidth: 0.5,
    marginTop: 5,
    borderRadius: 4,
    justifyContent: "center",
    borderColor: "#CC313D",
    backgroundColor: "#f7c5cc",
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

export default Item;
