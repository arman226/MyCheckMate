import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");
const ErrorHandler = ({ text, onRetry = () => {} }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! An Internal Error Occured</Text>
      <Text>{text}</Text>
      <TouchableOpacity style={styles.roundedButton} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 15,
    padding: 10,
  },
  roundedButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  retryText: {
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ErrorHandler;
