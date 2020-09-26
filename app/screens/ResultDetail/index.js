import React from "react";
import { ScrollView } from "react-native";
import Result from "../../components/Result";

const ResultDetail = ({ route, navigation }) => {
  const { item } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Result
        percentage={item.percentage}
        title={item.name}
        cause={item.cause}
        symptoms={item.symptoms}
        recommendation={item.recommendation}
      />
    </ScrollView>
  );
};

export default ResultDetail;
