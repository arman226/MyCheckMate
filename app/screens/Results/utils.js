import { getIllnesses } from "../../services/illness";

export const getCommon = (arr1, arr2) => {
  var common = [];
  for (var i = 0; i < arr1.length; ++i) {
    for (var j = 0; j < arr2.length; ++j) {
      if (arr1[i] == arr2[j]) {
        common.push(arr1[i]);
      }
    }
  }
  return common;
};

export const initializeData = async (
  setIsLoading,
  setResults,
  setMessage,
  userSelectedSymptoms
) => {
  setIsLoading(true);
  try {
    const response = await getIllnesses(userSelectedSymptoms);
    var responseItems = [];
    var responseItemsWithPercentage = [];
    var sortedResponseItems = [];
    response.map((illness) => {
      var itemObject = {
        ...illness,
        common: getCommon(illness.symptoms, userSelectedSymptoms),
      };
      responseItems.push(itemObject);
    });

    responseItems.map((illness) => {
      var itemObject = {
        ...illness,
        percentage: illness.common.length / illness.symptoms.length,
      };
      responseItemsWithPercentage.push(itemObject);
    });

    setResults(responseItemsWithPercentage);
  } catch (error) {
    setMessage(error.message);
  } finally {
    setIsLoading(false);
    setMessage("");
  }
};
