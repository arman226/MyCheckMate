import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import yoga from "../../../assets/yoga.jpg";
import { actionCreators as actions } from "../../../modules/symptoms/actionCreators";
import { actionCreators as userActions } from "../../../modules/local/actionCreators";

const { width, height } = Dimensions.get("screen");
const Instruction = ({
  userSelectedSymptoms,
  setUserSelectedSymtpoms,
  onClear = () => {},
}) => {
  const clearAction = () => {
    Alert.alert("Are you sure?", "Do you want to clear all your changes?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          setUserSelectedSymtpoms([]);
          onClear();
        },
      },
    ]);
    return true;
  };

  return (
    <View style={styles.container}>
      <Image source={yoga} style={styles.image} />
      <View style={styles.header(userSelectedSymptoms.length > 0)}>
        <Text style={styles.title}>Identify Your Symptoms</Text>
        {/* {userSelectedSymptoms.length > 0 && (
          <TouchableOpacity onPress={clearAction}>
            <Text style={{ fontSize: 13, color: "#08529c" }}>Clear All</Text>
          </TouchableOpacity>
        )} */}
      </View>

      <Text
        style={[
          styles.instruction,
          { textAlign: "center", paddingHorizontal: 7, paddingRight: 12 },
        ]}
      >
        Kindly specify your symptoms from the categories below, so we can help
        you understand your condition.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: (one) => ({
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10,
  }),
  instruction: {
    fontSize: 12,
    paddingVertical: 11,
  },
  container: {
    padding: 2,
    paddingTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    height: height * 0.15,
    // width: width * 0.92,
    width,
    resizeMode: "contain",
    borderRadius: height / 2,
    marginBottom: 3,
  },
});

const mapStateToProps = (state) => {
  const { symptoms } = state.symptoms;
  const { userSelectedSymptoms } = state.userSelectedSymptoms;
  return { state, symptoms, userSelectedSymptoms };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSymptoms: bindActionCreators(actions.setSymptoms, dispatch),
    setUserSelectedSymtpoms: bindActionCreators(
      userActions.setSelectedSymptoms,
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Instruction);
