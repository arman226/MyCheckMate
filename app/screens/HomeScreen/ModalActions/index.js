import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Button from "../../AgeScreen/Button";
import { connect } from "react-redux";

const WIDTH = Dimensions.get("window").width;

const ModalActions = ({ onSave }) => {
  return (
    <View style={styles.container}>
      <Button text="Save" buttonWidth={WIDTH * 0.9} onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.92,
    flexDirection: "row",
    marginTop: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => {
  const { symptoms } = state.symptoms;
  const { userSelectedSymptoms } = state.userSelectedSymptoms;
  return { state, symptoms, userSelectedSymptoms };
};

export default connect(mapStateToProps)(ModalActions);
