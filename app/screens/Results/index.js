//this shows the results
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Result from "../../components/Result";
import NoDataPlaceholder from "../HomeScreen/NoDataPlaceholder";
import { initializeData } from "./utils";
import ErrorHandler from "../HomeScreen/ErrorHandler";
import Precaution from "./Precaution";

const { height, width } = Dimensions.get("window");
const Results = ({ userSelectedSymptoms }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);

  //This is not for self diagnosis but for guidance seek help from a professional
  useEffect(() => {
    initializeResults();
  }, []);

  const initializeResults = async () => {
    await initializeData(
      setIsLoading,
      setResults,
      setMessage,
      userSelectedSymptoms
    );
  };

  const renderItem = ({ item }) => (
    <Result
      percentage={item.percentage}
      title={item.name}
      cause={item.cause}
      symptoms={item.symptoms}
      recommendation={item.recommendation}
    />
  );
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (message) {
    return <ErrorHandler text={message} onRetry={initializeResults} />;
  }
  if (userSelectedSymptoms.length === 0) {
    return <NoDataPlaceholder text={`You haven't specified any symptom yet`} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={results}
        refreshing={isLoading}
        onRefresh={initializeResults}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (results.length > 0 ? <Precaution /> : null)}
        ListEmptyComponent={() => (
          <NoDataPlaceholder text="Sorry. We can't help you with your condition." />
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  loading: {
    height,
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
});
function mapStateToProps(state) {
  const { userSelectedSymptoms } = state.userSelectedSymptoms;
  return { userSelectedSymptoms };
}

export default connect(mapStateToProps)(Results);
