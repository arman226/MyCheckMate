import React, { useEffect } from "react";
import Result from "../../components/Result";

const ResultDetail = ({ route, navigation }) => {
  const { item } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
  }, [navigation]);

  return (
    <Result
      percentage={item.percentage}
      title={item.name}
      cause={item.cause}
      symptoms={item.symptoms}
      recommendation={item.recommendation}
    />
  );
};

export default ResultDetail;
