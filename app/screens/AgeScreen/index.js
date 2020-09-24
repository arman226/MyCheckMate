import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Button from "./Button";
import fillout from "../../assets/fillout.jpg";
const { width, height } = Dimensions.get("screen");
const AgeScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [age, setAge] = useState(0);
  const [show, setShow] = useState(false);
  const AGE_LABEL = "How old are you?";
  const AGE_PLACEHOLDER = "Enter your age here";
  const HEADER_TEXT = "Age Verification";
  const DESCRIPTION = "It is important that you let us know your age.";
  const handleCheck = async () => {
    await setIsChecked(!isChecked);
    setShow(!isChecked && age > 0);
  };

  const handleOnTextChange = (e) => {
    setAge(e);
    if (e === 0) {
      setShow(false);
      setIsChecked(false);
    } else if (e >= 18) {
      setShow(true);
    } else if (e <= 17) {
      if (isChecked) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image source={fillout} style={styles.image} />
      <Text style={styles.header}>{HEADER_TEXT}</Text>
      <Text style={styles.description}>{DESCRIPTION}</Text>
      <Text style={styles.label}>{AGE_LABEL}</Text>
      <TextInput
        placeholder={AGE_PLACEHOLDER}
        style={styles.input}
        maxLength={3}
        keyboardType="phone-pad"
        dataDetectorTypes="phoneNumber"
        onChangeText={handleOnTextChange}
      />
      {age <= 17 && age != 0 && (
        <TouchableOpacity
          style={styles.consentContainer}
          activeOpacity={0.67}
          onPress={handleCheck}
        >
          <View style={styles.checkContainer}>
            {isChecked && <Text style={styles.check}>✔</Text>}
          </View>
          <Text style={styles.checkText}>Are you with your parents?</Text>
        </TouchableOpacity>
      )}
      <View style={{ alignContent: "center" }}>
        <Button
          text="Submit"
          active={show && age > 0}
          onPress={() => {
            navigation.navigate("Check Mate");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.15,
    width: width * 0.92,
    resizeMode: "contain",
    borderRadius: 4,
    marginBottom: 3,
  },
  check: {
    color: "green",
    fontSize: 10,
  },
  checkText: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  checkContainer: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  consentContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: "gray",
    padding: 2,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    paddingVertical: 5,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    // alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 14,
  },
});

export default AgeScreen;
