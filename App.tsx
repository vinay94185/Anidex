/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Info from './screens/Info';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
