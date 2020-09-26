import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import { connect } from "react-redux";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Category = ({
  onCategorySelect,
  category,
  userSelectedSymptoms,
  symptoms,
}) => {
  const { name, imagePath } = category.item;
  const [selectedSymptoms, setSelectedSymptoms] = useState(0);
  useEffect(() => {
    getNumberOfSelectedSymptom();
  }, [userSelectedSymptoms]);

  const getNumberOfSelectedSymptom = () => {
    let temp = [];
    userSelectedSymptoms.map((item) => {
      symptoms.map((s) => {
        if (item === s.name && s.category === category.item.name) {
          temp.push(s.name);
        }
      });
    });
    setSelectedSymptoms(temp.length);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => onCategorySelect(category)}
        activeOpacity={0.4}
      >
        <ImageBackground
          style={styles.container}
          imageStyle={{ opacity: 0.5, resizeMode: "cover" }}
          // source={{ uri: imagePath != "" ? imagePath : null }}
        >
          <Text style={styles.text}>
            <Text
              style={{
                color: "#FFFF",
                fontWeight: "bold",
                fontSize: 12,
                textDecorationStyle: "double",
              }}
            >
              ⚕{" "}
            </Text>
            {"Symptoms of " + name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      {selectedSymptoms > 0 && (
        <View style={styles.badge}>
          <Text style={{ color: "#FFF", fontSize: 10 }}>
            {selectedSymptoms}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "red",
    width: 25,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 40,
    position: "absolute",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
    marginLeft: 3,
  },
  container: {
    width: SCREEN_WIDTH * 0.46,
    flex: 1,
    marginLeft: 5,
    marginRight: 3,
    marginBottom: 9,
    marginTop: 1,
    borderRadius: 8,
    height: SCREEN_HEIGHT * 0.15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 1,
    backgroundColor: "#08529c",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderColor: "gray",
    borderWidth: 0,
  },
  text: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 11,
  },
});

const mapStateToProps = (state) => {
  const { symptoms } = state.symptoms;
  const { userSelectedSymptoms } = state.userSelectedSymptoms;
  return { state, symptoms, userSelectedSymptoms };
};

export default connect(mapStateToProps)(Category);
