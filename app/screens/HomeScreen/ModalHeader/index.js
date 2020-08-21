import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
const { width } = Dimensions.get("window");
const ModalHeader = ({ name, onClose }) => {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalHeaderTitle}>{name}</Text>
      {/* Close */}
      <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
        <Text style={styles.text}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    width,
    backgroundColor: "#FFF",
    alignItems: "stretch",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: Platform.OS === "ios" ? 35 : 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  modalHeaderTitle: {
    flex: 2,
    textAlignVertical: "bottom",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginRight: 15,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 50,
    borderWidth: 0,
  },
  text: {
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ModalHeader;
