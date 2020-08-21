import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Result(props) {
  const percentage = Math.round(props.percentage * 100);
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <Text style={styles.titleStyle}>{props.title.toUpperCase()}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progress(props.percentage)}></View>
      </View>
      <Text style={{ paddingTop: 5, color: "black" }}>{percentage}%</Text>

      <Text style={styles.division}>Cause</Text>
      <Text style={styles.detailText}>{props.cause}</Text>
      <Text style={styles.division}>Recommendation</Text>
      <Text style={styles.detailText}>{props.recommendation}</Text>
      <Text style={styles.division}>Symptom</Text>
      <FlatList
        data={props.symptoms}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={(symptom) => (
          <View style={styles.symptomStyle}>
            <Text style={styles.symptomText}>{symptom.item}</Text>
          </View>
        )}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  progress: (percentage) => ({
    backgroundColor: "#3c8ebc",
    height: 5,
    width: Dimensions.get("screen").width * percentage,
  }),
  progressContainer: {
    backgroundColor: "white",
    height: 5,
    width: Dimensions.get("screen").width * 0.92,
    marginRight: 15,
  },
  symptomText: {
    color: "white",
    fontSize: 10,
  },
  detailText: {
    color: "black",
    fontSize: 11,
  },
  symptomStyle: {
    backgroundColor: "#3c8ebc",
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "#fff",
    marginBottom: 5,
  },
  division: {
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
  container: {
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "#fff",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 15,
    width: Dimensions.get("window").width * 0.945,
    shadowColor: "black",
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0.8,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
