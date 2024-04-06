/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomMenu from './src/infrastructure/common/layouts/bottom-menu';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screen/Login';
import Constants from './src/core/common/constants';
import EditProfile from './src/screen/InfoUser/editProfile';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Constants.Navigator.LoginScreen.value}
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Favorite" component={Favorite} />
    <Stack.Screen name="Notification" component={Notification} /> */}
      <Stack.Screen
        name={Constants.Navigator.Navbar.value}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Constants.Navigator.LoginScreen.value} component={LoginScreen} />
      <Stack.Screen name={Constants.Navigator.InfoUserScreen.EditProfile.value} component={EditProfile} />

    </Stack.Navigator>
  );
};


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
