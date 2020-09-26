//https://www.vectorstock.com/royalty-free-vector/flat-web-icon-with-long-shadow-mobile-applications-vector-11146763
import React, { useEffect, useState } from "react";
import {
  Modal,
  FlatList,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import { getCategories } from "../../services/category";
import { getSymptoms } from "../../services/symptoms";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../../modules/symptoms/actionCreators";
import { actionCreators as userActions } from "../../modules/local/actionCreators";
import Item from "./Item";
import NoDataPlaceholder from "./NoDataPlaceholder";
import ModalHeader from "./ModalHeader";
import Category from "./Category";
import ErrorHandler from "./ErrorHandler";
import SeeResultsButton from "./SeeResultsButton";
import Instruction from "./Instruction";
import empty from "../../assets/empty.jpg";
import ModalActions from "./ModalActions";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HomeScreen = ({
  symptoms,
  setSymptoms,
  navigation,
  setUserSelectedSymtpoms,
  userSelectedSymptoms,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SeeResultsButton onPress={seeResults} />,
      headerLeft: () => null,
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
  //for newly Selected Symptoms
  const [newSymp, setNewSymp] = useState([]);
  //
  const seeResults = () => {
    navigation.navigate("Results");
  };
  //this contains the symptoms to be displayed
  const [displayedSymptoms, setDisplayedSymptoms] = useState([]);
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
      let tempNewSymp = newSymp;
      //if not yet
      if (!newSelected.get(_id)) {
        tempNewSymp.push(_id);
        setNewSymp(tempNewSymp);
      } else {
        const index = tempNewSymp.indexOf(_id);
        tempNewSymp.splice(index, 1);
        setNewSymp(tempNewSymp);
      }
    },
    [selected]
  );

  const allSelectedSymptoms = () => {
    setModalVisible(false);
    collectSymptoms();
  };

  const collectSymptoms = () => {
    var tempSelectedSymptoms = [...selected.keys()];
    var tempSelectedSymptomsValue = [...selected.values()];
    var assignedSymptoms = [];
    tempSelectedSymptoms.map((symp, key) => {
      if (tempSelectedSymptomsValue[key]) {
        assignedSymptoms.push(symp);
      }
    });
    //saves to store
    setUserSelectedSymtpoms(assignedSymptoms);
    //deletes the temp
    setNewSymp([]);
  };

  const renderSymptoms = ({ item }) => (
    <Item
      _id={item.name}
      title={item.name}
      description={item.description}
      selected={!!selected.get(item.name)}
      onSelect={onSelect}
    />
  );

  //this function takes place every time the Home screen is being rendered
  useEffect(() => {
    initializeData();
    const backAction = () => {
      Alert.alert(
        "Are you sure you want to go back?",
        "If you continue, you'll lose your changes.",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              navigation.goBack();
              setUserSelectedSymtpoms([]);
            },
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
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
            onClose={() => {
              const newSelected = new Map(selected);
              var temp = [...newSelected.keys()];
              //deactivates which has to be deactivated
              temp.map((s) =>
                newSelected.set(s, userSelectedSymptoms.includes(s))
              );
              setSelected(newSelected);
              setModalVisible(false);
            }}
          />
          <FlatList
            keyExtractor={(item) => item._id}
            data={displayedSymptoms}
            showsVerticalScrollIndicator={false}
            renderItem={renderSymptoms}
            ListEmptyComponent={() => (
              <NoDataPlaceholder text="No symptoms to choose from">
                <Image source={empty} style={styles.image} />
              </NoDataPlaceholder>
            )}
            extraData={selected}
          />
          <ModalActions onSave={allSelectedSymptoms} />
        </View>
      </Modal>

      <FlatList
        keyExtractor={(item) => item._id}
        numColumns={2}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        ListHeaderComponent={() =>
          categories.length > 0 ? (
            <Instruction
              onClear={() => {
                setSelected(new Map());
              }}
            />
          ) : null
        }
        data={categories}
        showsVerticalScrollIndicator={false}
        renderItem={(category) => (
          <Category category={category} onCategorySelect={onCategorySelect} />
        )}
        ListEmptyComponent={() => (
          <NoDataPlaceholder text="I'm sorry! We don't have a list of categories for you to choose from">
            <Image source={empty} style={styles.image} />
          </NoDataPlaceholder>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.92,
    resizeMode: "contain",
    borderRadius: 4,
    marginBottom: 6,
  },
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
