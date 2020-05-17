import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import reducer from './app/modules/symptoms/reducers'
import reducers from './app/modules/local/reducer'
//screens
import HomeScreen from './app/screens/HomeScreen'
import Results from './app/screens/Results'

const rootReducers = combineReducers({
  reducer,


})
const store = createStore(combineReducers({ symptoms: reducer, userSelectedSymptoms: reducers }))
// console.log('this is my store', store.dispatch({ type: 'SET_SELECTED_SYMPTOMS', payload: [] }))
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer><Stack.Navigator>
        <Stack.Screen
          name="Check Mate"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Results"
          component={Results}
        />
      </Stack.Navigator></NavigationContainer>
    </Provider>
  );
}