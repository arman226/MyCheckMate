import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

const { height, width } = Dimensions.get("window");
const Result = (props) => {
  const percentage = Math.round(props.percentage * 100);
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <View
        style={[
          styles.card,
          {
            borderLeftColor: "#d7a9e3ff",
            borderLeftWidth: 4,
          },
        ]}
      >
        <Text style={styles.division}>Cause</Text>
        <Text style={styles.detailText}>{props.cause}</Text>
      </View>
      <View
        style={[
          styles.card,
          {
            borderLeftColor: "#8bbbee8ff",
            borderLeftWidth: 4,
          },
        ]}
      >
        <Text style={styles.division}>Recommendation</Text>
        <Text style={styles.detailText}>{props.recommendation}</Text>
      </View>
      <View
        style={[
          styles.card,
          {
            borderLeftColor: "#a8d5baff",
            borderLeftWidth: 4,
          },
        ]}
      >
        <Text style={styles.division}>Symptoms</Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    alignItems: "flex-start",
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 9,
    width: width * 0.97,
    shadowColor: "black",
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: 5,
    paddingBottom: 10,
  },
  percentageContainer: {
    backgroundColor: "#3c8ebc",
    marginTop: 0,
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    zIndex: 999,
  },
  etiquette: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
  },
  progress: (percentage) => ({
    backgroundColor: "#3c8ebc",
    height: 5,
    borderRadius: 50,
    width: Dimensions.get("screen").width * percentage,
  }),
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
    fontSize: 20,
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
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: "#FFF",
    paddingLeft: 5,
    width: width,
    shadowColor: "black",
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    height,
  },
});

export default Result;
