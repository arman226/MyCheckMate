import React, { useEffect, useState } from "react";
import {
  Modal,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { getCategories } from "../../services/category";
import { getSymptoms } from "../../services/symptoms";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../../modules/symptoms/actionCreators";
import { actionCreators as userActions } from "../../modules/local/actionCreators";
import Item from "./Item";
import NoDataPlaceholder from "./NoDataPlaceholder";
import ItemSeparator from "./ItemSeparator";
import ModalHeader from "./ModalHeader";
import Category from "./Category";
import ErrorHandler from "./ErrorHandler";
import SeeResultsButton from "./SeeResultsButton";
import Instruction from "./Instruction";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HomeScreen = ({
  symptoms,
  setSymptoms,
  navigation,
  setUserSelectedSymtpoms,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SeeResultsButton onPress={seeResults} />,
    });
  }, [navigation]);
  //this will contain the list of fetched categories
  const [categories, setCategories] = useState([]);
  //this determines whether or not the loading indicator is supposed to be shown
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  //error message
  const [message, setMessage] = useState("");
  //this determines whether the modal (list of symptoms to choose from) is expected to be shown
  const [modalVisible, setModalVisible] = useState(false);
  //this contains the selected category
  const [selectedCategory, setSelectedCategory] = useState({
    item: {
      name: "",
    },
  });
  //
  const seeResults = () => {
    navigation.navigate("Results");
  };
  //this contains the symptoms to be displayed
  const [displayedSymptoms, setDisplayedSymptoms] = useState([]);
  //this contains all the selected symptoms of the user
  const [selectedSymptoms, setMySelectedSymptoms] = useState([]);
  const [selected, setSelected] = React.useState(new Map());
  //fetching Categories from API
  const setCategoryList = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      setMessage(error.message);
    }
  };
  //fetching Symptoms from the API
  const fetchAllSymptoms = async () => {
    try {
      const response = await getSymptoms();
      setSymptoms(response);
    } catch (error) {
      setMessage(error.message);
    }
  };
  //this sets all the initial data
  const initializeData = async () => {
    setIsLoading(true);
    try {
      await setCategoryList();
      await fetchAllSymptoms();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const refreshList = async () => {
    setIsRefreshing(true);
    try {
      await setCategoryList();
      await fetchAllSymptoms();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsRefreshing(false);
      setMessage("");
    }
  };

  //when a category is selected
  const onCategorySelect = (category) => {
    try {
      setModalVisible(true);
      setSelectedCategory(category);
      var tempSymptoms = [];
      symptoms.map((symptom) =>
        symptom.category === category.item.name
          ? tempSymptoms.push(symptom)
          : null
      );
      setDisplayedSymptoms(tempSymptoms);
    } catch (error) {
      setMessage(error.message);
    }
  };

  //this function executes whenever the user chooses a symptom from the options
  const onSelect = React.useCallback(
    (_id) => {
      const newSelected = new Map(selected);
      newSelected.set(_id, !selected.get(_id));
      setSelected(newSelected);
    },
    [selected]
  );

  const allSelectedSymptoms = async () => {
    setModalVisible(false);
    var tempSelectedSymptoms = [...selected.keys()];
    var tempSelectedSymptomsValue = [...selected.values()];
    var assignedSymptoms = [];
    tempSelectedSymptoms.map((symp, key) => {
      if (tempSelectedSymptomsValue[key]) {
        assignedSymptoms.push(symp);
      }
    });
    setMySelectedSymptoms(assignedSymptoms);
    await setUserSelectedSymtpoms(assignedSymptoms);
  };

  const renderSymptoms = ({ item }) => (
    <Item
      _id={item.name}
      title={item.name}
      selected={!!selected.get(item.name)}
      onSelect={onSelect}
    />
  );

  //this function takes place every time the Home screen is being rendered
  useEffect(() => {
    initializeData();
  }, []);

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (message) {
    return <ErrorHandler text={message} onRetry={initializeData} />;
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <ModalHeader
            name={selectedCategory.item.name}
            onClose={allSelectedSymptoms}
          />
          <FlatList
            keyExtractor={(item) => item._id}
            data={displayedSymptoms}
            showsVerticalScrollIndicator={false}
            renderItem={renderSymptoms}
            ListEmptyComponent={() => (
              <NoDataPlaceholder text="No symptoms to choose from" />
            )}
            extraData={selected}
          />
        </View>
      </Modal>

      <FlatList
        keyExtractor={(item) => item._id}
        numColumns={2}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        ListHeaderComponent={() =>
          categories.length > 0 ? <Instruction /> : null
        }
        data={categories}
        showsVerticalScrollIndicator={false}
        renderItem={(category) => (
          <Category category={category} onCategorySelect={onCategorySelect} />
        )}
        ListEmptyComponent={() => <NoDataPlaceholder text={message} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    height: HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalContainer: {
    width: WIDTH,
    alignItems: "center",
    height: HEIGHT,
    backgroundColor: "#FFF",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
