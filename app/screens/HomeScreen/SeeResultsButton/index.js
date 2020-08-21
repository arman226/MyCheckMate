import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const SeeResultsButton = ({ onPress, userSelectedSymptoms }) => {
  const handleOnPress = () => {
    if (userSelectedSymptoms.length > 0) {
      onPress();
    } else {
      alert("You haven't specified any symptom yet");
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={styles.container}
      activeOpacity={0.6}
    >
      <Text style={styles.text(userSelectedSymptoms.length > 0)}>
        See Results
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  text: (hasSymptoms) => ({
    textDecorationStyle: "solid",
    color: hasSymptoms ? "black" : "gray",
  }),
});

const mapStateToProps = (state) => {
  const { symptoms } = state.symptoms;
  const { userSelectedSymptoms } = state.userSelectedSymptoms;
  return { state, symptoms, userSelectedSymptoms };
};

export default connect(mapStateToProps)(SeeResultsButton);
