import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import reducer from "./app/modules/symptoms/reducers";
import reducers from "./app/modules/local/reducer";
//screens
import HomeScreen from "./app/screens/HomeScreen";
import Results from "./app/screens/Results";
import AgeScreen from "./app/screens/AgeScreen";
import ResultDetail from "./app/screens/ResultDetail";

const rootReducers = combineReducers({
  reducer,
});
const store = createStore(
  combineReducers({ symptoms: reducer, userSelectedSymptoms: reducers })
);

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Age Verification"
            component={AgeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Check Mate" component={HomeScreen} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Details" component={ResultDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
